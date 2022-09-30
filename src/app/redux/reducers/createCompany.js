const initialState = {
    loading: false,
    error: undefined,
    createCompany: {},
  };
  
  const createCompany = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_COMPANY_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "CREATE_COMPANY_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
          createCompany: action.createCompany,
        };
      case "CREATE_COMPANY_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default createCompany;
  