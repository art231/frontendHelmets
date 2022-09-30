const initialState = {
  loading: false,
  error: undefined,
  reportCard: [],
};

const reportCard = (state = initialState, action) => {

  switch (action.type) {
      case "GET_REPORT_CARD_REQUEST":
          return {
              ...state,
              loading: true,
              error: undefined,
              reportCard: [],
          };
      case "GET_REPORT_CARD_SUCCESS":
          return {
              ...state,
              loading: false,
              error: false,
              reportCard: action.reportCard
          };
      case "GET_REPORT_CARD_FAIL":
          return {
              ...state,
              loading: false,
              error: action.error,
              reportCard: [],
          };
      default:
          return state;
  }

};

export default reportCard;
