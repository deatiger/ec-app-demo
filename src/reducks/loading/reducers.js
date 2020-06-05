import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const LoadingReducer = (state = initialState.loading, action)  => {
    switch (action.type) {
        case Actions.HIDE_LOADING:
            return {
                ...state,
                ...action.payload
            };
        case Actions.SHOW_LOADING:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
};
