const initialState = {
    loading: false,
    error: undefined,
    deleteHelmetModal: {},
  };
  
  const deleteHelmetModal = (state = initialState, action) => {
    switch (action.type) {
      case "DELETE_HELMET_MODAL_REQUEST":
        return {
          ...state,
          loading: true,
          error: undefined,
        };
      case "DELETE_HELMET_MODAL_SUCCESS":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case "DELETE_HELMET_MODAL_FAIL":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default deleteHelmetModal;
  