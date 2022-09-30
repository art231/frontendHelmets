const initialState = {
    loading: false,
    error: undefined,
    listGeozones: [],
};

const listGeozones = (state = initialState, action) => {

    switch (action.type) {
        case "GET_GEOZONES_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                listGeozones: [],
            };
        case "GET_GEOZONES_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                listGeozones: action.listGeozones
            };
        case "GET_GEOZONES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                listGeozones: [],
            };
        default:
            return state;
    }

};

export default listGeozones;