const initialState = {
    loading: false,
    error: undefined,
    bindUser: {},
  };
  
  const bindUser = (state = initialState, action) => {
    switch (action.type) {
      case "_BIND_USER_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "BIND_USER_SUCCESS":
        return {
          ...state,
          loading: false,
          bindUser: action.bindUser,
        };
      case "BIND_USER_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default bindUser;
  