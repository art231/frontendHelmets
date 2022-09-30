const initialState = {
  loading: false,
  error: undefined,
  condition: []
};

const conditionsHelmets = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONDITIONS_HELMETS_REQUEST":
      return {
        ...state,
        loading: true,
        error: undefined,
        condition: []
      };
    case "GET_CONDITIONS_HELMETS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        condition: action.condition
      };
    case "GET_CONDITIONS_HELMETS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
        condition: []
      };
    default:
      return state;
  }
};

export default conditionsHelmets;
