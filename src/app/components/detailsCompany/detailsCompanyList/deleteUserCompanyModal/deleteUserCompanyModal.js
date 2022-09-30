import React, { Component } from "react";
import _ from "lodash";

class DeleteUserCompanyModal extends Component {
  state = {
    user: {
      userId: 0,
      companyId: 0,
    },
  };
  componentDidUpdate(prevProps) {
    let { userModal, company } = this.props;
    if (prevProps.userModal !== userModal) {
      this.setState({ user: { userId: userModal.id, companyId: company.id } });
    }
    if (prevProps.deleteUserError !== this.props.deleteUserError) {
      let { company } = this.props;
      this.props.getUsers(company.id);
    }
  } 
  deleteUser() {
    let { user } = this.state;
    this.props.deleteUserFunc(user);
  }
  render() {
    return (
      <div
        className="modal fade"
        id="DeleteUserModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="DeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="DeleteModalLabel">
                Пользователь будет удален из компании, но останется в системе
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
            <div className="modal-footer justify-content-center">
              <button
                id="modal-closed"
                className="btn btn-danger btn-sm"
                type="button"
                onClick={() => this.deleteUser()}
                data-dismiss="modal"
              >
                Да
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
export default DeleteUserCompanyModal;
