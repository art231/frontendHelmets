import React, { Component } from "react";
import _ from "lodash";

class ExistUserCompanyModal extends Component {
  state = {
    user: {
      companyId: this.props.company.id,
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "Male",
      password: "",
    },
  };
  handleChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    let { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
      createUserValue: false,
      createUserErrorValue: false,
    });
  };

  updateUserHandler() {
    let { user } = this.state;
    this.props.getUser(user);
    let { errorGetUser } = this.props;
    if (errorGetUser === "Нет данных") {
      this.props.createUserFunc(user);
    }
    this.setState({
      user: {
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "Male",
        password: "",
      },
    });
  }
  componentDidUpdate(prevProps) {
    let { createUser, company,createUserError } = this.props;
    if (prevProps.createUser !== createUser) {
      let data = { companyId: company, user: createUser };
      this.props.bindUserFunc(data);
    }
    if (
      createUserError === "ОК" &&
      prevProps.createUserError !== createUserError
    ) {
      this.setState({ createUserValue: true });
    }
  }
  updateWindow() {
    let { company } = this.props;
    this.props.getUsers(company.id);
  }
  render() {
    let { user, createUserValue, createUserErrorValue } = this.state;
    let { company, getUserByLogin, errorGetUser, createUserError } = this.props;
    let hiddenTitle = true;
    let newUser = true;
    if (getUserByLogin.id) {
      hiddenTitle = false;
    }
    if (errorGetUser === "Нет данных") {
      newUser = false;
    }

    return (
      <div>
        <div
          className="modal fade"
          id="ExistUserModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="UpdateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title m-auto" id="UpdateModalLabel">
                  Добавить пользователя в компанию
                </h4>
                <button
                  className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                  onClick={() => this.updateWindow()}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="font-weight-light" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body text-left">
                <div className="form-group">
                  <h4>
                    <b>Компания {company.name}</b>
                  </h4>
                  <h5 className="font-weight-medium" hidden={hiddenTitle}>
                    Вы добавляете существующего пользователя в компанию
                  </h5>
                  <input
                    value={user.email || ""}
                    name="email"
                    placeholder="Login"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  <label></label>
                  <input
                    hidden={newUser}
                    value={user.firstName || ""}
                    name="firstName"
                    placeholder="ФИО"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  <label></label>
                  <input
                    hidden={newUser}
                    value={user.password || ""}
                    name="password"
                    placeholder="Пароль"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  {createUserErrorValue ? (
                    <label>
                      <p className="text-danger">{createUserError}</p>
                    </label>
                  ) : null}
                  {createUserValue ? (
                    <label>
                      <h3 className="text-success">Пользователь создан</h3>
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  hidden={createUserValue}
                  id="modal-closed"
                  className="btn btn-success btn-sm"
                  type="button"
                  onClick={() => this.updateUserHandler()}
                >
                  Создать
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => this.updateWindow()}
                  data-dismiss="modal"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ExistUserCompanyModal;
