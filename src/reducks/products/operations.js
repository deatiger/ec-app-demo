import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deleteProductAction, fetchProductsAction} from "./actions"

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        db.collection('products').doc(id).delete()
            .then(() => {
                const prevProducts = getState().products.list
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteProductAction(nextProducts))
            })
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        db.collection('products').orderBy('updated_at', 'desc').get().then(snapshots => {
            const productList = []
            snapshots.forEach(snapshot => {
                const product = snapshot.data()
                productList.push(product)
            })
            dispatch(fetchProductsAction(productList))
        })
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
            const ref = db.collection('products').doc()
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        }

        return db.collection('products').doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}