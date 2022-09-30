const initialState = {
    loading: false,
    error: undefined,
    updateUser: {},
};

const updateUser = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "UPDATE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }

};

export default updateUser;
