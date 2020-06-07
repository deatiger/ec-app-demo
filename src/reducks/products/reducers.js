import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action)  => {
    switch (action.type) {
        case Actions.DELETE_PRODUCT:
            return {
                ...state,
                list: action.payload
            };
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: action.payload
            };
        case Actions.INIT_PRODUCTS:
            return {
                ...initialState.products
            };
        default:
            return state
    }
};
