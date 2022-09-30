import { API_URL_AUTH } from '../../app.config.js';
import { getErrorString } from '../../common/errorSwitch';
import { saveDataStorage } from '../../common/localStorageHelper';



export const putAuth = (data) => dispatch => {
    dispatch({ type: "PUT_LOGIN_REQUEST" });

    (async () => {
        const rawResponse = await fetch(API_URL_AUTH + '/Auth/SignInByEmail', {
            method: 'PUT',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify({
                "login": data.login,
                "passwd": data.password,
                "rememberMe": true,
                "companyId": 1
            })
        })

        if(rawResponse.status === 200) {
            const content = await rawResponse.json();
            saveDataStorage("access_Token", content && content.access_Token);
            saveDataStorage("refresh_Token", content && content.refresh_Token);
            saveDataStorage("refresh_Time", new Date().getTime() + Number(content && content.expires_in * 1000));
            saveDataStorage("expires_in", content && content.expires_in * 1000);

            dispatch({
                type: "PUT_LOGIN_SUCCESS",
                authenticated: content.access_Token
            });
        } else {
            const status = await getErrorString(rawResponse.status)
            dispatch({
                type: "PUT_LOGIN_FAIL",
                error: status,
            });
        }
    })()
};

export const getEmail = (email) => dispatch => {
    dispatch({ type: "GET_EMAIL_REQUEST" });

    dispatch({
        type: "GET_EMAIL_SUCCESS",
        email: email
    });
};

export const logout = () => dispatch => {
    dispatch({ type: "LOGOUT" });
}
