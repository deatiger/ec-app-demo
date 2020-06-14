import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deleteProductAction, fetchProductsAction} from "./actions"
import {hideLoadingAction, showLoadingAction} from "../loading/actions";

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().products.list
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteProductAction(nextProducts))
            })
    }
}

export const fetchProducts = (gender, category) => {
    return async (dispatch) => {
        let query = productsRef.orderBy('updated_at', 'desc');
        query = (gender !== "") ? query.where('gender', '==', gender) : query;
        query = (category !== "") ? query.where('category', '==', category) : query;

        query.get()
            .then(snapshots => {
            const productList = []
            snapshots.forEach(snapshot => {
                const product = snapshot.data()
                productList.push(product)
            })
            dispatch(fetchProductsAction(productList))
        })
    }
}

export const orderProduct = (productsInCart) => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("決済処理中..."))

        const uid = getState().users.uid
        const userRef = db.collection('users').doc(uid)
        const timestamp = FirebaseTimestamp.now()
        let amount = 0;
        let products = {}

        for (const product of productsInCart) {
            await db.runTransaction(transaction  => {
                return transaction.get(productsRef.doc(product.productId)).then(snapshot => {
                    const sizes = snapshot.data().sizes

                    // Create a new array of the product sizes
                    const updateSizes = sizes.map(size => {
                        if (size.size === product.size) {
                            if (size.quantity === 0) {
                                alert('申し訳ございませんが「' + product.name + '」は売り切れたため購入できませんでした。');
                                return size
                            }
                            return {
                                size: size.size,
                                quantity: size.quantity - 1
                            }
                        } else {
                            return size
                        }
                    })

                    amount += product.price;
                    products[product.productId] = {
                        id: product.productId,
                        images: product.images,
                        name: product.name,
                        price: product.price,
                        size: product.size
                    }
                    transaction.update(productsRef.doc(product.productId), {sizes: updateSizes})
                    transaction.delete(userRef.collection('cart').doc(product.cartId))
                }).catch(error => {
                    dispatch(hideLoadingAction())
                    throw new Error("Transaction Failed! ", error)
                })
            })
        }

        // Create order history data
        const orderRef = userRef.collection('orders').doc()
        const date = timestamp.toDate()

        // Calculate shipping date which is the date after 3 days
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

        const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp
        }
        await orderRef.set(history)

        dispatch(hideLoadingAction())
        dispatch(push('/order/complete'))
    }
}

export const saveProduct = (id, name, description, category, gender, price, sizes, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            sizes: sizes,
            updated_at: timestamp
        }

        if (id === "") {
            const ref = productsRef.doc()
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        }

        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}