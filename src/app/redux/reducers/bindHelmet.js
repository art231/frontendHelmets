const initialState = {
    loading: false,
    error: undefined,
    bindHelmet: {},
  };
  
  const bindHelmet = (state = initialState, action) => {
    switch (action.type) {
      case "_BIND_HELMET_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "BIND_HELMET_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
          bindHelmet: action.bindHelmet,
        };
      case "BIND_HELMET_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default bindHelmet;
  