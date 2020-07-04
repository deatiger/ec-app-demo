import React, {useEffect, useCallback} from 'react';
import {CardElement, useElements} from "@stripe/react-stripe-js";
import {makeStyles} from "@material-ui/styles";
import {theme} from "../../assets/theme";
import {PrimaryButton} from "../UIkit";
import {useDispatch} from "react-redux";
import {registerCard} from "../../reducks/payments/operations";
import {useStripe} from "@stripe/react-stripe-js";
import {getCustomerId} from "../../reducks/users/selectors";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    element: {
        backgroundColor: theme.palette.secondary.light,
        padding: 16,
    }
});

const PaymentEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const element = useElements();
    const selector = useSelector((state) => state);
    const customerId = getCustomerId(selector);

    const register = useCallback(() => {
        dispatch(registerCard(stripe, element))
    }, [stripe, element]);

    useEffect(() => {

    },[]);

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">クレジットカード情報の登録・編集</h2>
            <div className="module-spacer--medium"/>

            <CardElement
                className={classes.element}
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: theme.palette.grey["700"],
                            '::placeholder': {
                                color: theme.palette.grey["500"],
                            }
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="module-spacer--medium"/>

            <div className="center">
                <PrimaryButton
                    label={"保存する"}
                    onClick={register}
                />
            </div>
        </section>
    );
};

export default PaymentEdit;