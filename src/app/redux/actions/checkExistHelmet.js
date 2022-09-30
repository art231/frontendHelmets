import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const checkExistHelmet = (helmet) => (dispatch) => {
  dispatch({ type: "CHECK_EXIST_HELMET_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Helmets/AddToCompany", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          "serial": parseInt(helmet.serial),
          "companyId": helmet.companyId,
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
        type: "CHECK_EXIST_HELMET_SUCCESS",
        error: status,
        checkExistHelmet: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      const content = await rawResponse.json();
      dispatch({
        type: "CHECK_EXIST_HELMET_FAIL",
        error: status,
        checkExistHelmet: content,
      });
    }
  })();
};
