import { API_URL } from '../../app.config.js';
import {getErrorString} from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

export const getReportGeofences = (companyId, from, to) => dispatch => {
  dispatch({ type: "GET_REPORT_GEOFENCES_REQUEST" });

  (async () => {
      const rawResponse = await doRequest(fetch(API_URL + '/Reports/GeofencesStats?' + (companyId ? 'CompanyId=' + companyId : '') + '&From=' + from + '&To=' + to, {
          method: 'GET',
          headers: {
              'Accept': 'text/plain',
              'Content-Type': 'application/json-patch+json',
              "Authorization": getDataStorage("access_Token")
          }
      }), ()=> { getReportGeofences(getDataStorage("access_Token"), companyId, from, to)(dispatch)})

      if(rawResponse.status === 200) {
          console.log(rawResponse.status);
          const content = await rawResponse.json();
          dispatch({
              type: "GET_REPORT_GEOFENCES_SUCCESS",
              reportGeofences: content,
          });
      } else {
          const status = await getErrorString(rawResponse.status)
          dispatch({
              type: "GET_REPORT_GEOFENCES_FAIL",
              error: status,
          });
      }
  })()
};
