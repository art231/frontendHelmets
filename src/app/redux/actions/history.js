import { API_URL } from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import {doRequest} from "../../common/requestHelper";
import moment from 'moment-timezone';



export const getHistoryHelmet = (id, from, to, getTz) => dispatch => {
    dispatch({ type: "GET_HELMET_HISTORY_REQUEST" });

    (async () => {
    
        if(getTz) {
            const tzResponse = await doRequest(fetch(API_URL + '/Helmets/TimezoneCondition?HelmetSerial=' + id + ((to) ? '&To=' + to : ''), {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    "Authorization": getDataStorage("access_Token")
                }
            }));
            if(tzResponse.status === 200) {//temporary workaround for cases with changing timezone TODO something with that
                const content = await tzResponse.json();
                let tz = content.condition.olsonName;
                from = moment(from);
                from = moment.tz([from.year(), from.month(), from.date()], tz);
                to = from.clone().add(1, 'days').add(-1, 'seconds').utc().format();
                from = from.utc().format();
                
            }
            else {
                const status = await getErrorString(rawResponse.status)
                dispatch({
                    type: "GET_HELMET_HISTORY_FAIL",
                    error: status,
                });
                return;
            }

        } 

        console.log("To", to);

        const rawResponse = await doRequest(fetch(API_URL + '/Helmets/Stats?Id=' + id + '&From=' + from + ((to) ? '&To=' + to : ''), {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            }
        }),  ()=> { getHistoryHelmet(getDataStorage("access_Token"), id, from, to, getTz)(dispatch)})

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            dispatch({
                type: "GET_HELMET_HISTORY_SUCCESS",
                history: content,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "GET_HELMET_HISTORY_FAIL",
                error: status,
            });
        }
    })()
};
