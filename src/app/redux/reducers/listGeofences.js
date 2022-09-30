const initialState = {
    loading: false,
    error: undefined,
    listGeofences: [],
};

const listGeofences = (state = initialState, action) => {

    switch (action.type) {
        case "GET_LIST_GEOFENCES_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                listGeofences: [],
            };
        case "GET_LIST_GEOFENCES_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                listGeofences: action.listGeofences
            };
        case "GET_LIST_GEOFENCES_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                listGeofences: [],
            };
        default:
            return state;
    }

};

export default listGeofences;
