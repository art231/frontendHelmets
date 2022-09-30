import { API_URL } from '../../app.config.js';
import {getErrorString} from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

export const getListIncidents = (to, take) => dispatch => {
    dispatch({ type: "GET_LIST_INCIDENTS_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Incidents' + ((take) ? '?Take=' + take : '') + ((to) ? '&To=' + to : ''), {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getListIncidents(getDataStorage("access_Token"), to, take)(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_LIST_INCIDENTS_SUCCESS",
                listIncidents: content
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_LIST_INCIDENTS_FAIL",
                error: status,
            });
        }
    })()
};

let callbackQueue = [];

export const getNowIncidents = () => dispatch => {
    dispatch({ type: "GET_NOW_INCIDENTS_REQUEST" });

    let request

    if(callbackQueue.length < 1) {
        request = (async () => {
            const rawResponse = await doRequest(fetch(API_URL + '/Incidents/LongPolling', {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    "Authorization": getDataStorage("access_Token")
                }
            }),  ()=> { getNowIncidents(getDataStorage("access_Token"))(dispatch)})

            callbackQueue = []

            console.log('====rawResponse', rawResponse)

            if(rawResponse.status === 200) {
                const content = await rawResponse.json();
                dispatch({
                    type: "GET_NOW_INCIDENTS_SUCCESS",
                    incident: content
                });
            } else if (rawResponse.status === 204) {
                dispatch({
                    type: "GET_NOW_INCIDENTS_NO_CONTENT",
                });
            } else {
                const status = await getErrorString(rawResponse.status)
                dispatch({
                    type: "GET_NOW_INCIDENTS_FAIL",
                    error: status
                });
            }
        })()
    }

    callbackQueue.push(request)
};
