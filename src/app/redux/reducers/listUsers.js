const initialState = {
    loading: false,
    error: undefined,
    listUsers: [],
  };
  
  const listUsers = (state = initialState, action) => {
  
    switch (action.type) {
        case "GET_LIST_USERS_REQUEST":
            return {
                ...state,
                loading: true,
                error: undefined,
                listUsers: [],
            };
        case "GET_LIST_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                listUsers: action.listUsers
            };
        case "GET_LIST_USERS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.error,
                listUsers: [],
            };
        default:
            return state;
    }
  
  };
  
  export default listUsers;
  