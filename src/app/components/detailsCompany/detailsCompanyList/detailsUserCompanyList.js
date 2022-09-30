import React, { Component } from "react";
import _ from "lodash";
import Loader from "../../loader/loader";
import UpdateUserCompanyModal from "./updateUserCompanyModal/updateUserCompanyModal";
import DeleteUserCompanyModal from "./deleteUserCompanyModal/deleteUserCompanyModal";
import ExistUserCompanyModal from "./existUserCompanyModal/existUserCompanyModal";

class DetailsCompanyList extends Component {
  state = {
    userModal: {},
    errorListUsers: undefined,
  };
  componentDidUpdate(prevProps) {
    let { errorListUsers } = this.state;
    if (this.props.listUsers !== prevProps.listUsers) {
      errorListUsers = this.props.errorListUsers;
      this.setState({
        errorListUsers,
      });
    }
  }

  setData(user) {
    this.setState({
      userModal: user,
    });
  }
  closedAlert = () => {
    this.setState({
      errorListUsers: undefined,
    });
  };
  render() {
    let { errorListUsers, userModal } = this.state;
    let { listUsers, location, company } = this.props;
    if (listUsers) {
      return (
        <div className="card mb-3">
          {errorListUsers !== "ОК" &&
          errorListUsers &&
          errorListUsers !== "Нет данных" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ошибка!</strong> {errorListUsers}
              <button
                className="close"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => this.closedAlert()}
              >
                <span className="font-weight-light" aria-hidden="true">
                  ×
                </span>
              </button>
              <div
                className="d-inline-block ml-2 cursor-pointer"
                onClick={() => location.reload()}
              >
                <i
                  className="fas fa-sync-alt"
                  style={{ width: "1rem", height: "1rem", color: "gray" }}
                ></i>
              </div>
            </div>
          ) : null}

          <div className="card-header">
            <div className="row align-items-center mt-lg-5">
              <div className="col">Пользователь компании {company.name}</div>
              <div className="col text-sm-right">
                <button
                  className="btn btn-outline-secondary mr-1 mb-1"
                  type="button"
                  data-target="#ExistUserModal"
                  data-toggle="modal"
                >
                  Добавить пользователя
                </button>
              </div>
            </div>

            <ExistUserCompanyModal company={company} {...this.props} />
            <table className="table table-bordered table-hover mt-lg-2">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Логин</th>
                  <th>Имя, Фамилия, Отчество</th>
                  <th>Дата создания</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="row-link">
                {listUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ width: "50%" }}>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.dateCreated.substring(0, 10)}</td>
                    <td className="text-lg-center">
                      <button
                        className="btn btn-outline-secondary mr-1 mb-1"
                        type="button"
                        id="customer-dropdown-0"
                        data-toggle="dropdown"
                        data-boundary="viewport"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        ...
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-right border py-0"
                        aria-labelledby="customer-dropdown-0"
                      >
                        <div className="bg-white py-2">
                          <span
                            className="dropdown-item cursor-pointer"
                            to="#!"
                            data-target="#UpdateUserModal"
                            data-toggle="modal"
                            onClick={() => this.setData(user)}
                          >
                            Изменить
                          </span>
                          <span
                            className="dropdown-item cursor-pointer text-danger"
                            data-target="#DeleteUserModal"
                            data-toggle="modal"
                            onClick={() => this.setData(user)}
                          >
                            Удалить
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <UpdateUserCompanyModal userModal={userModal} {...this.props} />
          <DeleteUserCompanyModal userModal={userModal} {...this.props} />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
export default DetailsCompanyList;
