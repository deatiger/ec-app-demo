export const EDIT_USER_PROFILE = "EDIT_USER_PROFILE";
export const editProfileStateAction = (userProfile) => {
    return {
        type: "EDIT_USER_PROFILE",
        payload: userProfile
    }
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
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
