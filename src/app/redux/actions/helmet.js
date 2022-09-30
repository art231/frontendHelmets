import { API_URL } from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import {doRequest} from "../../common/requestHelper";

export const getHelmet = (id, date) => dispatch => {
    dispatch({ type: "GET_HELMET_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets/Details?Id=' + id + ((date) ? '&To=' + date : ''), {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getHelmet(getDataStorage("access_Token"), id, date)(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_HELMET_SUCCESS",
                helmet: content
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_HELMET_FAIL",
                error: status,
            });
        }
    })()
};

export const getHelmetTimezone = (id, date) => dispatch => {
    dispatch({ type: "GET_HELMET_TIMEZONE_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets/TimezoneCondition?HelmetSerial=' + id + ((date) ? '&To=' + date : ''), {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getHelmetTimezone(getDataStorage("access_Token"), id, date)(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_HELMET_TIMEZONE_SUCCESS",
                tz: content
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_HELMET_TIMEZONE_FAIL",
                error: status,
            });
        }
    })()
};

export const deleteHelmet = id => dispatch => {
    dispatch({ type: "DELETE_HELMET_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets?Id=' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  () => { deleteHelmet(getDataStorage("access_Token"), id)(dispatch)})

        if(rawResponse.status === 200) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "DELETE_HELMET_SUCCESS",
                error: status,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "DELETE_HELMET_FAIL",
                error: status,
            });
        }
    })()
};

export const postHelmet = helmet => dispatch => {
    dispatch({ type: "POST_HELMET_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            },
            body: JSON.stringify({
                "serial": helmet.serial,
                "name": helmet.name,
                "sim": helmet.sim,
                "userId": 0,
                "distributorCompanyId": 2,
            })
        }),  ()=> { getHelmet(getDataStorage("access_Token"), id, date)(dispatch)})

        if(rawResponse.status === 200) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "POST_HELMET_SUCCESS",
                error: status,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "POST_HELMET_FAIL",
                error: status,
            });
        }
    })()
};

export const updateHelmet = (id, newHelmet) => dispatch => {
    dispatch({ type: "UPDATE_HELMET_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Helmets?Id=' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            },
            body: JSON.stringify({
                "serial": newHelmet.serial,
                "name": newHelmet.name,
                "sim": newHelmet.sim,
                "userId": id,
            })
        }),  () => { getHelmet(getDataStorage("access_Token"), id, data)(dispatch)})

        if(rawResponse.status === 200) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "UPDATE_HELMET_SUCCESS",
                error: status,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "UPDATE_HELMET_FAIL",
                error: status,
            });
        }
    })()
};