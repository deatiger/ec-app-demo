import React from 'react';
import {useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/Products";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto',
        maxWidth: 768,
        width: '100%'
    },
}));

const CartList = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const productsInCart = getProductsInCart(selector);

    return (
        <section className="c-section-wrapin">
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem product={product} />)
                )}
            </List>
        </section>
    );
};

export default CartList;