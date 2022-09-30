import { API_URL_AUTH } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getListCompanies } from "./getListCompanies.js";

export const getUserByLogin = (user) => (dispatch) => {
  dispatch({ type: "GET_USER_BY_LOGIN_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL_AUTH + "/Users?login=" + user.email, {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
      }),
      () => {
        getListCompanies(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      dispatch({
        type: "GET_USER_BY_LOGIN_SUCCESS",
        getUser: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "GET_USER_BY_LOGIN_FAIL",
        error: status,
      });
    }
  })();
};
