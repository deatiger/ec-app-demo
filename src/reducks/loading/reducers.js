import * as Actions from 'src/reducks/loading/actions';
import {initialState} from 'src/reducks/store/initialState';

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
