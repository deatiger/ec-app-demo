import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";

export const saveProduct = (id, productName, description, category, price, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            description: description,
            images: images,
            productName: productName,
            price: price,
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