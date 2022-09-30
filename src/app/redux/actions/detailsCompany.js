import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";

export const getDetailsCompany = (company) => (dispatch) => {
  
  dispatch({ type: "GET_DETAILS_COMPANY_REQUEST" });
  (async () => {
    const rawResponse = await doRequest(
      
      fetch(API_URL + "/Companies/Details?Id="+company.id, {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
      }),
      () => {
        detailsCompany(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      dispatch({
        type: "GET_DETAILS_COMPANY_SUCCESS",
        detailsCompany: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "GET_DETAILS_COMPANY_FAIL",
        error: status,
      });
    }
  })();
};
