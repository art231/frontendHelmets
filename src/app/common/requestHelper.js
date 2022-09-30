import { saveDataStorage, removeDataStorage, getDataStorage } from './localStorageHelper';
import {API_URL_AUTH} from "../app.config";
let callbackQueue = [];
let attempt = 1;

export async function doRequest(request, callback) {

    callbackQueue.push(callback);
    const rawResponse = await request.then();

    if (rawResponse.status === 401) {
        refreshToken()
    } else {
        let index = callbackQueue.indexOf(callback);
        if (index > -1) {
            callbackQueue.splice(index, 1);
        }
    }

    return rawResponse;
}

function executQueue() {
    callbackQueue.map(cb => cb());
    callbackQueue = [];
}

export function refreshToken() {
    if (attempt > 5) {
        removeDataStorage("access_Token");
        removeDataStorage("refresh_Token");
        window.location = '/'
    }

    (async () => {
        const rawResponse = await fetch(API_URL_AUTH + '/Auth/refreshAuthToken', {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify({
                "refresh_Token": getDataStorage("refresh_Token"),
                "grant_type": "refresh_token",
            })
        });

        if (rawResponse.status == 200) {
            const content = await rawResponse.json();
            saveDataStorage("refresh_Time", new Date().getTime() + Number(content && content.expires_in * 1000));
            saveDataStorage("access_Token", content && content.access_Token);
            saveDataStorage("refresh_Token", content && content.refresh_Token);

            attempt = 1;
            executQueue();
        } else if(rawResponse.status == 422) {
            removeDataStorage("access_Token");
            removeDataStorage("refresh_Token");
            window.location = '/'
        } else {
            attempt++;
            refreshToken()
        }

    })();
}

