const initialState = {
    loading: false,
    error: undefined,
    deleteUser: {},
  };
  
  const deleteUser = (state = initialState, action) => {
    switch (action.type) {
      case "DELETE_USER_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "DELETE_USER_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case "DELETE_USER_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default deleteUser;
  