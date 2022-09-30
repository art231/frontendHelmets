import {getDataStorage} from '../../common/localStorageHelper';

const initialState = {
    loading: false,
    error: undefined,
    authenticated: getDataStorage("access_Token"),
    email: ''
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case "PUT_LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                authenticated: undefined,
            };
        case "PUT_LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                authenticated: action.authenticated,
            };
        case "PUT_LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                authenticated: undefined,
            };



        case "GET_EMAIL_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                email: '',
            };
        case "GET_EMAIL_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                email: action.email,
            };
        case "GET_EMAIL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                email: '',
            };



        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
            }
        default:
            return state;
    }

};

export default auth;
