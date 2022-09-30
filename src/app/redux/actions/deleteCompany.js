import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const deleteCompany = (company) => (dispatch) => {
  dispatch({ type: "DELETE_COMPANY_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Companies?Id=" + company.id, {
        method: "DELETE",
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
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "DELETE_COMPANY_SUCCESS",
        error: status,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "DELETE_COMPANY_FAIL",
        error: status,
      });
    }
  })();
};
