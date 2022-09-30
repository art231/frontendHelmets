import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";

export const getListCompanies = (role) => (dispatch) => {
  let url =
    role == undefined
      ? (url = "/Companies")
      : (url = "/Companies?Role=" + role);
  dispatch({ type: "GET_LIST_COMPANIES_REQUEST" });
  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + url, {
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
        type: "GET_LIST_COMPANIES_SUCCESS",
        listCompanies: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "GET_LIST_COMPANIES_FAIL",
        error: status,
      });
    }
  })();
};
