const initialState = {
    loading: false,
    error: undefined,
    deleteCompany: {},
  };
  
  const deleteCompany = (state = initialState, action) => {
    switch (action.type) {
      case "DELETE_COMPANY_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "DELETE_COMPANY_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case "DELETE_COMPANY_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default deleteCompany;
  