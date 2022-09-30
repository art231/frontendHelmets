const initialState = {
  loading: false,
  error: undefined,
  groupStatsItemsWithoutGeofence: [],
  groupStatsItemsWithGeofence: [],
};

const GroupReport = (state = initialState, action) => {

  switch (action.type) {
      case "GET_GROUP_REPORT_REQUEST":
          return {
              ...state,
              loading: true,
              error: undefined,
              groupStatsItemsWithoutGeofence: [],
              groupStatsItemsWithGeofence: [],
          };
      case "GET_GROUP_REPORT_WITHOUT_GEOFENCE_SUCCESS":
          return {
              ...state,
              loading: false,
              error: false,
              groupStatsItemsWithoutGeofence: action.groupStatsItemsWithoutGeofence,
          };
      case "GET_GROUP_REPORT_FAIL":
          return {
              ...state,
              loading: false,
              error: action.error,
              groupStatsItemsWithoutGeofence: [],
              groupStatsItemsWithGeofence: [],
          };
      case "GET_GROUP_REPORT_WITH_GEOFENCE_SUCCESS":
          return {
              ...state,
              loading: false,
              error: false,
              groupStatsItemsWithoutGeofence: action.groupStatsItemsWithoutGeofence,
              groupStatsItemsWithGeofence: action.groupStatsItemsWithGeofence,
          };
      default:
          return state;
  }

};

export default GroupReport;
