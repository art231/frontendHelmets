const initialState = {
    loading: false,
    error: undefined,
    geozone: {},
};

const geozone = (state = initialState, action) => {

    switch (action.type) {
        case "GET_GEOZONE_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                geozone: {},
            };
        case "GET_GEOZONE_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                geozone: action.geozone
            };
        case "GET_GEOZONE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                geozone: {},
            };

        case "CLEAN_GEOZONE":
            return {
                ...state,
                deleted:false,
                created:false,
            };


        case "DELETE_GEOZONE_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "DELETE_GEOZONE_SUCCESS":
            return {
                ...state,
                loading: false,
                deleted: true,
                error: false,
            };
        case "DELETE_GEOZONE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };



        case "POST_GEOZONE_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "POST_GEOZONE_SUCCESS":
            return {
                ...state,
                loading: false,
                created: true,
                error: action.error,
            };
        case "POST_GEOZONE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };

            
        case "UPDATE_GEOZONE_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "UPDATE_GEOZONE_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "UPDATE_GEOZONE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }

};

export default geozone;