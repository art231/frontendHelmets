import React, { Component } from "react";
import _ from "lodash";

import ListCompanyHelmets from "./listCompanyHelmets/listCompanyHelmets";
import ListCompanies from "./listCompanies/listCompanies";
import DetailsCompanyList from "./detailsCompanyList/detailsUserCompanyList";
import UpdateCompanyModal from "./detailsCompanyModal/updateCompanyModal";
import DeleteCompanyModal from "./detailsCompanyModal/deleteCompanyModal";

class DetailsCompany extends Component {
  state = {
    ...this.props.location.state,
    helmetValue: {
      updateHelmetErrorValue: false,
      deleteHelmetErrorValue: false,
    },
    userValue: {
      updateUserErrorValue: false,
      deleteUserErrorValue: false,
    },
    companyValue: {
      updateCompanyErrorValue: false,
      deleteCompanyErrorValue: false,
    },
  };
  componentDidMount() {
    let { location } = this.props;
    this.props.getListHelmets(location.state.company.id);
    location.state.company.roleName == "Admin"
      ? this.props.getListCompanies("Distributor")
      : this.props.getListCompanies("Customer");

    this.props.getUsers(location.state.company.id);
  }
  closedAlert = () => {
    this.setState({
      helmetValue: {
        updateHelmetErrorValue: false,
        deleteHelmetErrorValue: false,
      },
      userValue: {
        updateUserErrorValue: false,
        deleteUserErrorValue: false,
      },
      companyValue: {
        updateCompanyErrorValue: false,
        deleteCompanyErrorValue: false,
      },
    });
  };
  componentDidUpdate(prevProps) {
    let {
      updateUser,
      updateUserError,
      deleteUser,
      deleteUserError,
      updateHelmet,
      updateHelmetError,
      deleteHelmet,
      deleteHelmetError,
    } = this.props;
    if (
      prevProps.updateUser !== updateUser &&
      updateUserError !== "ОК" &&
      updateUserError !== undefined
    ) {
      this.setState({ userValue: { updateUserErrorValue: true } });
    }
    if (
      prevProps.deleteUser !== deleteUser &&
      deleteUserError !== "ОК" &&
      deleteUserError !== undefined
    ) {
      this.setState({ userValue: { deleteUserErrorValue: true } });
    }
    if (
      prevProps.updateHelmetError !== updateHelmetError &&
      updateHelmetError !== "ОК" &&
      updateHelmetError !== undefined
    ) {
      this.setState({ helmetValue: { updateHelmetErrorValue: true } });
    }
    if (
      prevProps.deleteHelmet !== deleteHelmet &&
      deleteHelmetError !== "ОК" &&
      deleteHelmetError !== undefined
    ) {
      this.setState({ helmetValue: { deleteHelmetErrorValue: true } });
    }
  }
  updateState = (value) => {
    let { company } = this.state;
    this.setState({
      ...company,
      company: {
        name: value,
        trCreated: this.props.location.state.company.trCreated,
      },
    });
  };

  render() {
    let { company, userValue, helmetValue } = this.state;
    let {
      updateUserError,
      deleteUserError,
      updateHelmetError,
      deleteHelmetError,
    } = this.props;
    return (
      <div className="card-header">
        {userValue.updateUserErrorValue ||
        userValue.deleteUserErrorValue ||
        helmetValue.updateHelmetErrorValue ||
        helmetValue.deleteHelmetErrorValue ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Ошибка!</strong>{" "}
            {updateUserError ||
              deleteUserError ||
              updateHelmetError ||
              deleteHelmetError}
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
        <h3>{company.name}</h3>
        <div className="row align-items-center">
          <div className="col">
            Тип организации: {company.roleName}
            <br />
            Дата создания: {company.trCreated.substring(0, 10)}
          </div>
          <div className="col text-sm-right">
            <button
              className="btn btn-outline-primary mr-3 mb-1"
              type="button"
              data-target="#UpdateCompanyModal"
              data-toggle="modal"
            >
              Изменить
            </button>
            <button
              className="btn btn-outline-primary mr-1 mb-1"
              type="button"
              data-target="#DeleteCompanyModal"
              data-toggle="modal"
            >
              Удалить
            </button>
          </div>
        </div>
        <UpdateCompanyModal
          company={company}
          {...this.props}
          handleCompanyName={this.updateState}
        />
        <DeleteCompanyModal company={company} {...this.props} />

        <DetailsCompanyList {...this.props} company={this.state.company} />
        <ListCompanyHelmets {...this.props} company={this.state.company} />
        <ListCompanies {...this.props} company={this.state.company} />
      </div>
    );
  }
}
export default DetailsCompany;
