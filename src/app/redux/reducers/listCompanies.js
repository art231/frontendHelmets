const initialState = {
  loading: false,
  error: undefined,
  listCompanies: [],
};

const listCompanies = (state = initialState, action) => {

  switch (action.type) {
      case "GET_LIST_COMPANIES_REQUEST":
          return {
              ...state,
              loading: true,
              error: undefined,
              listCompanies: [],
          };
      case "GET_LIST_COMPANIES_SUCCESS":
          return {
              ...state,
              loading: false,
              error: false,
              listCompanies: action.listCompanies
          };
      case "GET_LIST_COMPANIES_FAIL":
          return {
              ...state,
              loading: false,
              error: action.error,
              listCompanies: [],
          };
      default:
          return state;
  }

};

export default listCompanies;
