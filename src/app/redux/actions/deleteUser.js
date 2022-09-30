import { API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const deleteUser = (user) => (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(
        API_URL +
          "/Users?CompanyUserId=" +
          user.userId +
          "&CompanyId=" +
          user.companyId,
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
        type: "DELETE_USER_SUCCESS",
        error: status,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "DELETE_USER_FAIL",
        error: status,
      });
    }
  })();
};
