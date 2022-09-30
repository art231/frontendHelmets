const initialState = {
    loading: false,
    error: undefined,
    history: {},
};

const historyHelmet = (state = initialState, action) => {

    switch (action.type) {
        case "GET_HELMET_HISTORY_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                history: {},
            };
        case "GET_HELMET_HISTORY_SUCCESS":
            return {
                ...state,
                loading: false,
                error: undefined,
                history: action.history,
            };
        case "GET_HELMET_HISTORY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                history: {},
            };
        case "CLEAN_HISTORY":
                return {
                    ...state,
                    loading: false,
                    error: undefined,
                    history: {},
                };    
        default:
            return state;
    }

};

export default historyHelmet;
