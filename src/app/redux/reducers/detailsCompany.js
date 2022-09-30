const initialState = {
    loading: false,
    error: undefined,
    detailsCompany: [],
  };
  
  const getDetailsCompany = (state = initialState, action) => {
  
    switch (action.type) {
        case "GET_DETAILS_COMPANY_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                detailsCompany: [],
            };
        case "GET_DETAILS_COMPANY_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                detailsCompany: action.detailsCompany
            };
        case "GET_DETAILS_COMPANY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                detailsCompany: [],
            };
        default:
            return state;
    }
  
  };
  
  export default getDetailsCompany;
  