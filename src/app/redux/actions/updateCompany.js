import { API_URL} from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { getDataStorage } from '../../common/localStorageHelper';
import {doRequest} from "../../common/requestHelper";

export const updateCompany = (company) => dispatch => {
    dispatch({ type: "UPDATE_COMPANY_REQUEST" });

    (async () => {
        const rawResponse = await doRequest(fetch(API_URL + '/Companies', {
            method: 'PUT',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                "Authorization": getDataStorage("access_Token")
            },
            body: JSON.stringify({
                "id":company.id,
                "name": company.name
            })
        }),  () => { getListCompanies(getDataStorage("access_Token"))(dispatch)})

        if(rawResponse.status === 200) {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "UPDATE_COMPANY_SUCCESS",
                error: status,
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "UPDATE_COMPANY_FAIL",
                error: status,
            });
        }
    })()
};