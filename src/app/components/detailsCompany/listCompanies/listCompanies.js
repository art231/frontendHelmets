import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Loader from "../../loader/loader";
import NewCompanyClientModal from "./newCompanyClientModal/newCompanyClientModal";
import NewCompanyDistributorModal from "./newCompanyDistributorModal/newCompanyDistributorModal";

class ListCompanies extends Component {
  state = {
    errorListCompanies: undefined,
    company: {
      name: "",
    },
  };
  componentDidUpdate(prevProps) {
    let { errorListCompanies } = this.state;
    if (this.props.listHelmets !== prevProps.listHelmets) {
      errorListCompanies = this.props.errorListCompanies;
      this.setState({
        errorListCompanies,
      });
    }
  }
  closedAlert = () => {
    this.setState({
      errorListCompanies: undefined,
    });
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
  createNewCompanyClient() {}
  render() {
    let { errorListCompanies } = this.state;
    let { listCompanies, location, company } = this.props;
    if (listCompanies) {
      return (
        <div className="card mb-3">
          {errorListCompanies !== "ОК" &&
          errorListCompanies &&
          errorListCompanies !== "Нет данных" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ошибка!</strong> {errorListCompanies}
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
              <div className="col">
                {location.state.company.roleName === "Admin"
                  ? "Компании дистрибьюторы, "
                  : "Компании клиенты компании "}
                {company.name}
              </div>
              <div className="col text-sm-right">
                <button
                  className="btn btn-outline-secondary mr-1 mb-1"
                  type="button"
                  data-target={
                    location.state.company.roleName === "Admin"
                      ? "#NewCompanyDistributorModal"
                      : "#NewCompanyClientModal"
                  }
                  data-toggle="modal"
                >
                  {location.state.company.roleName === "Admin"
                    ? "Новая компания дистрибьютор"
                    : "Новая компания клиент"}
                </button>
              </div>
            </div>

            <table className="table table-bordered table-hover mt-lg-2">
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>Название</th>
                  <th>Время создания</th>
                </tr>
              </thead>
              <tbody className="row-link">
                {listCompanies
                  ? listCompanies.map((company) => (
                      <tr key={company.id}>
                        <td style={{ width: "50%" }}>{company.name}</td>
                        <td>{company.trCreated.substring(0, 10)}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          <NewCompanyClientModal {...this.props} />
          <NewCompanyDistributorModal {...this.props} />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
export default ListCompanies;
