// import {handleActions} from 'redux-actions';
import * as Actions from 'src/reducks/users/actions';
import {initialState} from 'src/reducks/store/initialState';

export const UsersReducer = (state = initialState.users, action)  => {
    switch (action.type) {
        case Actions.EDIT_USER_PROFILE:
            return {
                ...state,
                icon_path: action.payload.icon_path,
                username: action.payload.username
            };
        case Actions.FETCH_USER_STATE:
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
