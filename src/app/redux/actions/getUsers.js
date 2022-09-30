import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";

export const getUsers = (id) => (dispatch) => {
  dispatch({ type: "GET_LIST_USERS_REQUEST" });
  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Users?CompanyId=" + id, {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
      }),
      () => {
        getUsers(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      dispatch({
        type: "GET_LIST_USERS_SUCCESS",
        listUsers: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "GET_LIST_USERS_FAIL",
        error: status,
      });
    }
  })();
};
