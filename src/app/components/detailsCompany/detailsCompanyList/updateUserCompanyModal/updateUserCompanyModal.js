import React, { Component } from "react";
import _ from "lodash";

class UpdateUserCompanyModal extends Component {
  state = {
    user: {
      email: "",
      firstName: "",
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
    });
  };
  componentDidUpdate(prevProps) {
    let { userModal } = this.props;
    if (prevProps.userModal !== userModal) {
      this.setState({
        user: userModal,
      });
    }
    if (prevProps.updateUserError !== this.props.updateUserError) {
      this.props.getUsers(this.props.company.id);
    }
  }
  update() {
    let { user } = this.state;

    this.props.updateUserFunc(user);
  }

  render() {
    let { user } = this.state;
    let { updateUserError } = this.props;
    return (
      <div
        className="modal fade"
        id="UpdateUserModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="UpdateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="UpdateModalLabel">
                Изменить пользователя
              </h5>
              <button
                className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
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
                <b>{this.props.userModal.email}</b>
                <br />
                <label htmlFor="name"></label>
                <input
                  placeholder="Иван Иванович Иванов"
                  name="firstName"
                  value={user.firstName || ""}
                  className="form-control"
                  id="fio"
                  type="text"
                  onChange={(event) => this.handleChange(event)}
                />

                <label htmlFor="Password"></label>
                <input
                  placeholder="Пароль"
                  name="password"
                  value={user.password || ""}
                  className="form-control"
                  type="text"
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="modal-closed"
                className="btn btn-success btn-sm"
                type="button"
                onClick={() => this.update()}
                data-dismiss="modal"
              >
                Изменить
              </button>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                data-dismiss="modal"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateUserCompanyModal;
