import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const deleteHelmetModal = (helmet) => (dispatch) => {
  dispatch({ type: "DELETE_HELMET_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(
        API_URL +
          "/Helmets/DeleteCompanyLink?Serial=" +
          helmet.serial +
          "&CompanyId=" +
          helmet.companyId +
          "&UserId=" +
          helmet.serial,
        {
          method: "DELETE",
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json-patch+json",
            Authorization: getDataStorage("access_Token"),
          },
        }
      ),
      () => {
        getUsers(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 204) {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "DELETE_HELMET_SUCCESS",
        error: status,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "DELETE_HELMET_FAIL",
        error: status,
      });
    }
  })();
};
