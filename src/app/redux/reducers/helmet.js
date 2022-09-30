const initialState = {
    loading: false,
    error: undefined,
    helmet: {},
};

const helmet = (state = initialState, action) => {

    switch (action.type) {
        case "GET_HELMET_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                helmet: {},
            };
        case "GET_HELMET_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
                helmet: action.helmet
            };
        case "GET_HELMET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                helmet: {},
            };

        case "GET_HELMET_TIMEZONE_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                tz: undefined,
            };
        case "GET_HELMET_TIMEZONE_SUCCESS":
            return {
                ...state,
                error: false,
                tz: action.tz
            };
        case "GET_HELMET_TIMEZONE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                tz: undefined,
            };

        case "CLEAN_TIMEZONE":
            return {
                ...state,
                tz: undefined,
            };



        case "DELETE_HELMET_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "DELETE_HELMET_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
            };
        case "DELETE_HELMET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };



        case "POST_HELMET_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "POST_HELMET_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "POST_HELMET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };

            
        case "UPDATE_HELMET_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "UPDATE_HELMET_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "UPDATE_HELMET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }

};

export default helmet;
