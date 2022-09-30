import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const createCompany = (company) => (dispatch) => {
  dispatch({ type: "CREATE_COMPANY_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Companies", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          name: company.name,
          parentCompanyId: company.companyId,
          roleId: company.roleId,
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
        type: "CREATE_COMPANY_SUCCESS",
        error: status,
        createCompany: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "CREATE_COMPANY_FAIL",
        error: status,
      });
    }
  })();
};
