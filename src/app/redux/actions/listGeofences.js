import { API_URL } from '../../app.config.js';
import {getErrorString} from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

export const getListGeofences = (companyId) => dispatch => {
  dispatch({ type: "GET_LIST_GEOFENCES_REQUEST" });

  (async () => {
      const rawResponse = await doRequest(fetch(API_URL + '/Geofences' + (companyId ? '?CompanyId=' + companyId : ''), {
          method: 'GET',
          headers: {
              'Accept': 'text/plain',
              'Content-Type': 'application/json-patch+json',
              "Authorization": getDataStorage("access_Token")
          }
      }), ()=> { getListGeofences(getDataStorage("access_Token"), companyId)(dispatch)})

      if(rawResponse.status === 200) {
          console.log(rawResponse.status);
          const content = await rawResponse.json();
          dispatch({
              type: "GET_LIST_GEOFENCES_SUCCESS",
              listGeofences: content,
          });
      } else {
          const status = await getErrorString(rawResponse.status)
          dispatch({
              type: "GET_LIST_GEOFENCES_FAIL",
              error: status,
          });
      }
  })()
};
