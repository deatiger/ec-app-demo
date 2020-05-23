export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = () => {
    return {
        type: "HIDE_LOADING",
        payload: {
            state: false,
            text: ""
        }
    }
};

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction = (text= "loading...") => {
    return {
        type: "SHOW_LOADING",
        payload: {
            state: true,
            text: text
        }
    }
};

