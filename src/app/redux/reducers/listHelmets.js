const initialState = {
    loading: false,
    error: undefined,
    listHelmets: [],
};

const listHelmets = (state = initialState, action) => {

    switch (action.type) {
        case "GET_LIST_HELMETS_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                listHelmets: [],
            };
        case "GET_LIST_HELMETS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                listHelmets: action.listHelmets
            };
        case "GET_LIST_HELMETS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                listHelmets: [],
            };
        default:
            return state;
    }

};

export default listHelmets;
