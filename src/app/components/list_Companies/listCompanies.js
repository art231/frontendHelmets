import React, { Component } from "react";
import _ from "lodash";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";

class ListCompanies extends Component {
  state = {
    errorList: undefined,
    sortedList: {},
  };

  componentDidMount() {
    this.props.getListCompanies();
  }

  componentDidUpdate(prevProps) {
    let { errorList } = this.state;
    if (this.props.listCompanies !== prevProps.listCompanies) {
      errorList = this.props.errorList;
      this.setState({
        errorList,
      });
    }
  }

  render() {
    let { errorList } = this.state;
    let { listCompanies, history } = this.props;

    let sortedList = [];
    if (listCompanies.data) {
      for (let i = 0; i < listCompanies.data.length; i++) {
        if (listCompanies.data[i].parentLink == null) {
          sortedList.push({
            id: listCompanies.data[i].id,
            name: listCompanies.data[i].name,
            roleName: listCompanies.data[i].roleName,
            trCreated: listCompanies.data[i].trCreated,
            child: false,
          });

          for (let j = 0; j < listCompanies.data.length; j++) {
            if (listCompanies.data[j].parentLink !== null) {
              if (
                listCompanies.data[i].id == listCompanies.data[j].parentLink.id
              ) {
                sortedList.push({
                  id: listCompanies.data[j].id,
                  name: listCompanies.data[j].name,
                  roleName: listCompanies.data[j].roleName,
                  trCreated: listCompanies.data[j].trCreated,
                  child: true,
                });
              }
            }
          }
        }
      }
    }

    if (listCompanies.data) {
      return (
        <div className="card mb-3">
          {errorList !== "ОК" && errorList && errorList !== "Нет данных" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ошибка!</strong> {errorCompanies || errorList}
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
            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-2">
              Вы имеете доступ к следующим компаниям
            </h5>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>Название</th>
                  <th>Роль</th>
                  <th>Время создания</th>
                </tr>
              </thead>
              <tbody className="row-link">
                {sortedList.map((company) =>
                  company.child !== true ? (
                    <tr key={company.id}>
                      <td style={{ width: "60%" }}>
                        <Link
                          to={{
                            pathname:
                              history.location.pathname + "/details-company",
                            state: { company },
                          }}
                        >
                          {company.name}
                        </Link>
                      </td>
                      <td>{company.roleName}</td>
                      <td>{company.trCreated.substring(0, 10)}</td>
                    </tr>
                  ) : (
                    <tr key={company.id}>
                      <td style={{ width: "60%" }}>
                        <ul>
                          <li>{company.name}</li>
                        </ul>
                      </td>
                      <td>{company.roleName}</td>
                      <td>{company.trCreated.substring(0, 10)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
export default ListCompanies;
