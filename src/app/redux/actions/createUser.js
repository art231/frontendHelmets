import { API_URL_AUTH, API_URL } from "../../app.config.js";
import { getErrorString } from "../../common/errorSwitch";
import { getDataStorage } from "../../common/localStorageHelper";
import { doRequest } from "../../common/requestHelper";
import { getUsers } from "./getUsers.js";

export const createUser = (user) => (dispatch) => {
  dispatch({ type: "CREATE_USER_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL_AUTH + "/Users", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          middleName: "",
          lastName: "",
          gender: user.gender,
          password: user.password,
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
        type: "CREATE_USER_SUCCESS",
        error: status,
        createUser: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "CREATE_USER_FAIL",
        error: status,
      });
    }
  })();
};

export const bindUser = (data) => (dispatch) => {
  dispatch({ type: "BIND_USER_REQUEST" });

  (async () => {
    const rawResponse = await doRequest(
      fetch(API_URL + "/Users", {
        method: "POST",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          Authorization: getDataStorage("access_Token"),
        },
        body: JSON.stringify({
          companyUserId: data.user,
          companyId: data.companyId.id,
        }),
      }),
      () => {
        getListCompanies(getDataStorage("access_Token"))(dispatch);
      }
    );

    if (rawResponse.status === 200) {
      dispatch({
        type: "BIND_USER_SUCCESS",
        checkUser: content,
      });
    } else {
      const status = await getErrorString(rawResponse.status);
      dispatch({
        type: "BIND_USER_FAIL",
        error: status,
      });
    }
  })();
};
