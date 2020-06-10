import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const UsersReducer = (state = initialState.users, action)  => {
    switch (action.type) {
        case Actions.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [...state.cart ,action.payload]
            };
        case Actions.EDIT_USER_PROFILE:
            return {
                ...state,
                icon_path: action.payload.icon_path,
                username: action.payload.username
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };
        case Actions.LOG_OUT:
            return {
                ...initialState.users,
            };
        default:
            return state
    }
};
