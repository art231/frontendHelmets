import { API_URL } from '../../app.config.js';
import {getErrorString} from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

export const getConditionsHelmets = () => dispatch => {
    dispatch({ type: "GET_CONDITIONS_HELMETS_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets/Conditions?Take=100&Skip=0', {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getConditionsHelmets(getDataStorage("access_Token"))(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_CONDITIONS_HELMETS_SUCCESS",
                condition: content
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_CONDITIONS_HELMETS_FAIL",
                error: status,
            });
        }
    })()
};
