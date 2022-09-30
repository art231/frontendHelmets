import { API_URL } from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import { doRequest } from '../../common/requestHelper';

const getReportWithoutGeofence = async (companyId, from, to) => {
    try {
        const rawResponse = await doRequest(fetch(API_URL + '/Reports/GroupStats?' + (companyId ? 'CompanyId=' + companyId + '&' : '') + 'GeofenceId=0&From=' + from + '&To=' + to, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }), () => { getReportWithoutGeofence(getDataStorage("access_Token"), companyId, from, to) });
        return (rawResponse.status === 200) && await rawResponse.json();
    } catch (error) {
        return await getErrorString(rawResponse.status);
    }
}

const getReportWithGeofence = async (companyId, geofenceId, from, to) => {
    try {
        const rawResponse = await doRequest(fetch(API_URL + '/Reports/GroupStats?' + (companyId ? 'CompanyId=' + companyId + '&' : '') + (geofenceId ? 'GeofenceId=' + geofenceId : 'GeofenceId=0') + '&From=' + from + '&To=' + to, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }), () => { getReportWithGeofence(getDataStorage("access_Token"), companyId, geofenceId, from, to) });
        return (rawResponse.status === 200) && await rawResponse.json();
    } catch (error) {
        return await getErrorString(rawResponse.status)
    }
}

const ReportWithGeofence = (companyId, geofenceId, from, to) => dispatch => {
    dispatch({ type: "GET_GROUP_REPORT_REQUEST" });
    (async () => {

        let arrResponses = [];
        try {
            const responses = await Promise.all([
                getReportWithoutGeofence(companyId, from, to),
                getReportWithGeofence(companyId, geofenceId, from, to)
            ]);
            for (let response of responses) {
                arrResponses.push(response);
            }
            dispatch({
                type: "GET_GROUP_REPORT_WITH_GEOFENCE_SUCCESS",
                groupStatsItemsWithoutGeofence: arrResponses[0],
                groupStatsItemsWithGeofence: arrResponses[1],
            });
        } catch (error) {
            dispatch({
                type: "GET_GROUP_REPORT_FAIL",
                error,
            });
        }

    })()
}

const ReportWithoutGeofence = (companyId, from, to) => dispatch => {
    dispatch({ type: "GET_GROUP_REPORT_REQUEST" });
    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Reports/GroupStats?' + (companyId ? 'CompanyId=' + companyId + '&': '') + 'GeofenceId=0&From=' + from + '&To=' + to, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }), () => { ReportWithoutGeofence(getDataStorage("access_Token"), companyId, from, to)(dispatch) })
        if (rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_GROUP_REPORT_WITHOUT_GEOFENCE_SUCCESS",
                groupStatsItemsWithoutGeofence: content,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_GROUP_REPORT_FAIL",
                error: status,
            });
        }
    })()
}

export const getGroupReport = (companyId, geofenceId, from, to) => dispatch => {
    if (geofenceId !== null) {
        dispatch(ReportWithGeofence(companyId, geofenceId, from, to));
    } else {
        dispatch(ReportWithoutGeofence(companyId, from, to));
    }
};
