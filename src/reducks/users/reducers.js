import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const UsersReducer = (state = initialState.users, action)  => {
    switch (action.type) {
        case Actions.EDIT_USER_PROFILE:
            return {
                ...state,
                icon_path: action.payload.icon_path,
                username: action.payload.username
            };
        case Actions.FETCH_ORDERS_HISTORY:
            return {
                ...state,
                orders: [...action.payload]
            };
        case Actions.FETCH_PRODUCTS_IN_CART:
            return {
                ...state,
                cart: [...action.payload]
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return {
                ...initialState.users,
            };
        case Actions.UPDATE_USER_STATE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};
