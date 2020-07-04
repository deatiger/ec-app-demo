import {showLoadingAction, hideLoadingAction} from "../loading/actions";
import {CardElement} from "@stripe/react-stripe-js";
import {db} from '../../firebase/index';
import {push} from "connected-react-router";

// Set Header
const headers = new Headers();
headers.set('Content-type', 'application/json');
const baseUrl = 'https://ec-app-12ba0.web.app';

export const registerCard = (stripe, elements) => {
    return async (dispatch, getState) => {
        const user = getState().users;
        const email = user.email;
        const uid = user.uid;
        const username = user.username;

        dispatch(showLoadingAction("決済処理中..."));
        //*********************** START VALIDATION **************************//
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            console.error("Does not exist stripe or elements");
            dispatch(hideLoadingAction());
            return;
        }

        // Get a reference to a mounted CardInputForm.
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("Does not exist cardElement");
            dispatch(hideLoadingAction());
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            dispatch(hideLoadingAction());
            alert(error.message);
            return;
        }

        const paymentMethodId = paymentMethod?.id;

        // Create customer on Stripe and register the email.
        const createCustomer = await fetch(baseUrl + '/v1/customer', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                email: email,
                paymentMethod: paymentMethodId,
                userId: uid,
                username: username
            })
        });

        const customerResponse = await createCustomer.json();
        const customerData = JSON.parse(customerResponse.body);
        const customerId = customerData.id;

        if (!customerId) {
            dispatch(hideLoadingAction());
            alert('カード情報の登録に失敗しました。');
        } else {
            db.collection('users').doc(uid).update({customer_id: customerId})
                .then(() => {
                    dispatch(hideLoadingAction());
                    alert('カード情報を登録しました。');
                    dispatch(push('/user/mypage'))
                }).catch(async (error) => {
                    console.error(error);
                    // Delete customer data from stripe
                    const deleteCustomer = await fetch(baseUrl + '/v1/customer', {
                        method: 'DELETE',
                        headers: headers,
                        body: JSON.stringify({customerId: customerId})
                    });
                    await deleteCustomer.json();
                    dispatch(hideLoadingAction());
                    alert('カード情報の登録に失敗しました。');
                })
        }


    }
};