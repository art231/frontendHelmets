const initialState = {
    loading: false,
    error: undefined,
    updateCompany: {},
};

const updateCompany = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_COMPANY_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case "UPDATE_COMPANY_SUCCESS":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "UPDATE_COMPANY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }

};

export default updateCompany;
