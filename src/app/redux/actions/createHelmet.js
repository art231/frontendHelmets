import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const createHelmet = (helmet) => (dispatch) => {
  dispatch({ type: "CREATE_HELMET_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Helmets", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          serial: helmet.serial,
          name: helmet.name,
          sim: helmet.sim,
        }),
      }),
      () => {
        getUsers(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const status = await getErrorString(rawResponse.status);
      const content = await rawResponse.json();
      dispatch({
        type: "CREATE_HELMET_SUCCESS",
        error: status,
        createHelmet: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "CREATE_HELMET_FAIL",
        error: status,
      });
    }
  })();
};
