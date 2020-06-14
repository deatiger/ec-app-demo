import React, {useEffect,  useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Badge} from "@material-ui/core";
import {fetchProductsInCart} from "../../reducks/users/operations";
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart, getUserId} from "../../reducks/users/selectors";
import {push} from "connected-react-router"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {db} from '../../firebase/index'

const HeaderMenu = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    let productsInCart = getProductsInCart(selector)

    // Listen products in user's cart
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(userId).collection('cart')
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            productsInCart.push(product)
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart))
            });

        return () => unsubscribe()
    },[])

    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorderIcon />
            </IconButton>
        </>
    );
};

export default HeaderMenu;