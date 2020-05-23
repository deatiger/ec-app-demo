export const EDIT_USER_PROFILE = "EDIT_USER_PROFILE";
export const editProfileStateAction = (userProfile) => {
    return {
        type: "EDIT_USER_PROFILE",
        payload: userProfile
    }
};

export const FETCH_USER_STATE = "FETCH_USER_STATE";
export const fetchUserStateAction = (userState) => {
    return {
        type: "FETCH_USER_STATE",
        payload: userState
    }
};

export const LOG_OUT = "LOG_OUT";
export const signOutAction = () => {
    return {
        type: "LOG_OUT",
        payload: null
    }
};
