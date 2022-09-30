import { API_URL } from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import {doRequest} from "../../common/requestHelper";

export const getListGeozones = (companyId) => dispatch => {
    dispatch({ type: "GET_GEOZONES_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Geofences' + (companyId ? '?CompanyId=' + companyId : ''), {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getListGeozones(getDataStorage("access_Token"), companyId)(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_GEOZONES_SUCCESS",
                listGeozones: content
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_GEOZONES_FAIL",
                error: status,
            });
        }
    })()
};

export const postGeozone = geozone => dispatch => {
    dispatch({ type: "POST_GEOZONE_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Geofences', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            },
            body: JSON.stringify({
                "name": geozone.name,
                "userId": 0,
                "companyId": geozone.companyId,
                "category":"Plant",
                "polygons": geozone.polygons
            })
        }),  ()=> { postGeozone(getDataStorage("access_Token"))(dispatch)})

        if(rawResponse.status === 200) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "POST_GEOZONE_SUCCESS",
                error: false,
                created: true,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "POST_GEOZONE_FAIL",
                error: status,
            });
        }
    })()
};


export const deleteGeozone = id => dispatch => {
    dispatch({ type: "DELETE_GEOZONE_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Geofences?Id=' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  () => { deleteGeozone(getDataStorage("access_Token"), id)(dispatch)})

        if(rawResponse.status === 204) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "DELETE_GEOZONE_SUCCESS",
                error: false,
                deleted: true,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "DELETE_GEOZONE_FAIL",
                error: status,
            });
        }
    })()
};

