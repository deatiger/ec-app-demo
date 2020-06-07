export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const deleteProductAction = (products) => {
    return {
        type: "DELETE_PRODUCT",
        payload: products
    }
}

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const fetchProductsAction = (products) => {
    return {
        type: "FETCH_PRODUCTS",
        payload: products
    }
}

export const INIT_PRODUCTS = "INIT_PRODUCTS";
export const initProductsAction = () => {
    return {
        type: "INIT_PRODUCTS",
        payload: null
    }
}