import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
export const bindHelmet = (data) => (dispatch) => {
  dispatch({ type: "BIND_HELMET_REQUEST" });

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
          serial: data.helmet.createHelmet.id,
          companyId: data.companyId.id,
        }),
      }),
      () => {
        getListCompanies(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      dispatch({
        type: "BIND_HELMET_SUCCESS",
        bindHelmet: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "BIND_HELMET_FAIL",
        error: status,
      });
    }
  })();
};
