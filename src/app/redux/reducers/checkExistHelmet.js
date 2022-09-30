const initialState = {
    loading: false,
    error: undefined,
    checkExistHelmet: {},
  };
  
  const checkExistHelmet = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_EXIST_HELMET_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "CHECK_EXIST_HELMET_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
          checkExistHelmet: action.checkExistHelmet,
        };
      case "CHECK_EXIST_HELMET_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
          checkExistHelmet: action.checkExistHelmet,
        };
      default:
        return state;
    }
  };
  
  export default checkExistHelmet;
  