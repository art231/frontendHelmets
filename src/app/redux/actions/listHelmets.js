import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";

export const getListHelmets = (id) => (dispatch) => {
  dispatch({ type: "GET_LIST_HELMETS_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Helmets?CompanyId=" + id + "&Take=100&Skip=0", {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
      }),
      () => {
        getListHelmets(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      dispatch({
        type: "GET_LIST_HELMETS_SUCCESS",
        listHelmets: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "GET_LIST_HELMETS_FAIL",
        error: status,
      });
    }
  })();
};
