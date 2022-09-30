const initialState = {
  loading: false,
  error: undefined,
  createUser: {},
};

const createUser = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: action.error,
        createUser: action.createUser,
      };
    case "CREATE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default createUser;
