const initialState = {
    loading: false,
    error: undefined,
    listIncidents: {},
};

const listIncidents = (state = initialState, action) => {

    switch (action.type) {
        case "GET_LIST_INCIDENTS_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                listIncidents: {},
            };
        case "GET_LIST_INCIDENTS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                listIncidents: action.listIncidents
            };
        case "GET_LIST_INCIDENTS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                listIncidents: {},
            };
        default:
            return state;
    }

};

export default listIncidents;
