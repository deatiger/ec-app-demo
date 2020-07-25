export const EDIT_USER_PROFILE = "EDIT_USER_PROFILE";
export const editProfileStateAction = (userProfile) => {
    return {
        type: "EDIT_USER_PROFILE",
        payload: userProfile
    }
};

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (orders) => {
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: orders
    }
}

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
}

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: userState
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: null
    }
};

export const UPDATE_USER_STATE = "UPDATE_USER_STATE";
export const updateUserStateAction = (userState) => {
    return {
        type: "UPDATE_USER_STATE",
        payload: userState
    }
};
