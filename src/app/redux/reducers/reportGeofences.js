const initialState = {
  loading: false,
  error: undefined,
  reportGeofences: [],
};

const ReportGeofences = (state = initialState, action) => {

  switch (action.type) {
      case "GET_REPORT_GEOFENCES_REQUEST":
          return {
              ...state,
              loading: true,
              error: undefined,
              reportGeofences: [],
          };
      case "GET_REPORT_GEOFENCES_SUCCESS":
          return {
              ...state,
              loading: false,
              error: false,
              reportGeofences: action.reportGeofences
          };
      case "GET_REPORT_GEOFENCES_FAIL":
          return {
              ...state,
              loading: false,
              error: action.error,
              reportGeofences: [],
          };
      default:
          return state;
  }

};

export default ReportGeofences;
