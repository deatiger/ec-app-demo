import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deleteProductAction, fetchProductsAction} from "./actions"

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

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at', 'desc').get().then(snapshots => {
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
        const uid = getState().users.uid
        const userRef = db.collection('users').doc(uid)
        const timestamp = FirebaseTimestamp.now()
        let amount = 0;
        let products = {}

        for (const product of productsInCart) {
            await productsRef.doc(product.productId).get()
                .then(snapshot => {
                    const batch = db.batch()
                    const sizes = snapshot.data().sizes

                    // Create a new array of the product sizes
                    const updateSizes = sizes.map(size => {
                        if (size.size === product.size) {
                            if (size.quantity === 0) {
                                alert('申し訳ございませんが「' + product.name + '」は他の会員が購入したため売り切れました。')
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
                        name: product.name,
                        price: product.price,
                        size: product.size
                    }
                    batch.update(productsRef.doc(product.productId), {sizes: updateSizes})
                    batch.delete(userRef.collection('cart').doc(product.cartId))
                    batch.commit()
                })
        }

        // Create order history data
        const orderRef = userRef.collection('orders').doc()
        const date = timestamp.toDate()
        const shippingDate = date.setDate(date.getDate() + 3)
        const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp
        }
        await orderRef.set(history)

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