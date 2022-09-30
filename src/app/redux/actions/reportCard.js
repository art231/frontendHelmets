import { API_URL } from '../../app.config.js';
import {getErrorString} from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

export const getReportCard = (companyId, geofenceId, from, to) => dispatch => {
  dispatch({ type: "GET_REPORT_CARD_REQUEST" });

  (async () => {
      const rawResponse = await doRequest(fetch(API_URL + '/Reports/HelmetStats?' + (companyId ? 'CompanyId=' + companyId + '&': '') + (geofenceId ? 'GeofenceId=' + geofenceId : 'GeofenceId=0') + '&From=' + from + '&To=' + to, {
          method: 'GET',
          headers: {
              'Accept': 'text/plain',
              'Content-Type': 'application/json-patch+json',
              "Authorization": getDataStorage("access_Token")
          }
      }), ()=> { getReportCard(getDataStorage("access_Token"), companyId, geofenceId, from, to)(dispatch)})

      if(rawResponse.status === 200) {
          console.log(rawResponse.status);
          const content = await rawResponse.json();
          dispatch({
              type: "GET_REPORT_CARD_SUCCESS",
              reportCard: content,
          });
      } else {
          const status = await getErrorString(rawResponse.status)
          dispatch({
              type: "GET_REPORT_CARD_FAIL",
              error: status,
          });
      }
  })()
};
