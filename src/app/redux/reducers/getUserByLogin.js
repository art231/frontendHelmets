const initialState = {
    loading: false,
    error: undefined,
    getUser: {},
};

const getUserByLogin = (state = initialState, action) => {

    switch (action.type) {
        case "GET_USER_BY_LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                getUser: {},
            };
        case "GET_USER_BY_LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                getUser: action.getUser
            };
        case "GET_USER_BY_LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                getUser: {},
            };
        default:
            return state;
    }

};

export default getUserByLogin;
