const initialState = {
    loading: false,
    error: undefined,
    createHelmet: {},
  };
  
  const createHelmet = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_HELMET_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "CREATE_HELMET_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
          createHelmet: action.createHelmet,
        };
      case "CREATE_HELMET_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default createHelmet;
  