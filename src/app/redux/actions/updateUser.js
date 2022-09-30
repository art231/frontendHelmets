import { API_URL_AUTH } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: "UPDATE_USER_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL_AUTH + "/Users", {
        method: "PATCH",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          password: user.password,
        }),
      }),
      () => {
        getListCompanies(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        error: status,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "UPDATE_USER_FAIL",
        error: status,
      });
    }
  })();
};
