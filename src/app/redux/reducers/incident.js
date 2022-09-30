const initialState = {
    loading: false,
    error: undefined,
    incident: {},
    start: false,
};

const incident = (state = initialState, action) => {

    switch (action.type) {
        case "GET_NOW_INCIDENTS_REQUEST":
            return {
                ...state,
                error: false,
                incident: {},
                start: false,
            };
        case "GET_NOW_INCIDENTS_SUCCESS":
            return {
                ...state,
                error: false,
                incident: action.incident,
                start: true,
            };
        case "GET_NOW_INCIDENTS_FAIL":
            return {
                ...state,
                error: action.error,
                incident: {},
                start: true,
            };
        case "GET_NOW_INCIDENTS_NO_CONTENT":
            return {
                ...state,
                error: false,
                incident: {},
                start: true,
            }
        default:
            return state;
    }

};

export default incident;
