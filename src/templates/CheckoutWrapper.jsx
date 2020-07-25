import React from 'react';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import {PaymentEdit} from "../components/Payment";

const STRIPE_PUBLIC_KEY = "pk_test_yMtI6EnoV2HRfmsrUWflyWN900oBOA7XvX";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentEdit />
        </Elements>
    );
};

export default CheckoutWrapper;