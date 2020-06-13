import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getOrdersHistory = createSelector(
    [usersSelector],
    state => state.orders
);

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
);

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
);

export const getUserRole = createSelector(
    [usersSelector],
    state => state.role
);

