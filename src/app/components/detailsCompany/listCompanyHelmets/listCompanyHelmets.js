import React, { Component } from "react";
import _ from "lodash";
import Loader from "../../loader/loader";
import UpdateHelmetModal from "./updateHelmetModal/updateHelmetModal";
import DeleteHelmetModal from "./deleteHelmetModal/deleteHelmetModal";
import CreateHelmetModal from "./createHelmetModal/createHelmetModal";

class ListCompanyHelmets extends Component {
  state = {
    helmet: {},
    errorListHelmets: undefined,
  };
  setData(helmet) {
    this.setState({
      helmet: helmet,
    });
  }
  componentDidUpdate(prevProps) {
    let { errorListHelmets } = this.state;
    if (this.props.listHelmets !== prevProps.listHelmets) {
      errorListHelmets = this.props.errorListHelmets;
      this.setState({
        errorListHelmets,
      });
    }
  }

  render() {
    let { errorListHelmets, helmet } = this.state;

    let { listHelmets, location, company } = this.props;
    if (listHelmets) {
      return (
        <div className="card mb-3">
          {errorListHelmets !== "ОК" &&
          errorListHelmets &&
          errorListHelmets !== "Нет данных" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ошибка!</strong> {errorListHelmets}
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
              <div className="col">Каски {company.name}</div>
              <div className="col text-sm-right">
                <button
                  className="btn btn-outline-secondary mr-1 mb-1"
                  type="button"
                  data-target="#CreateHelmetModal"
                  data-toggle="modal"
                >
                  Добавить каску
                </button>
              </div>
              <CreateHelmetModal {...this.props}/>
            </div>
            <table className="table table-bordered table-hover mt-lg-2">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Серийный номер</th>
                  <th>SIM</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="row-link">
                {listHelmets.map((helmet) =>
                  location.state.company.id === helmet.distributorCompanyId ? (
                    <tr key={helmet.id}>
                      <td style={{ width: "50%" }}>{helmet.name}</td>
                      <td>{helmet.serial}</td>
                      <td>{helmet.sim}</td>
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
                              data-target="#UpdateHelmetModal"
                              data-toggle="modal"
                              onClick={() => this.setData(helmet)}
                            >
                              Изменить
                            </span>
                            <span
                              className="dropdown-item cursor-pointer text-danger"
                              onClick={() => this.setData(helmet)}
                              data-target="#DeleteHelmetModal"
                              data-toggle="modal"
                            >
                              Удалить
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </div>

          <UpdateHelmetModal helmet={helmet} {...this.props}/>

          <DeleteHelmetModal helmet={helmet}  {...this.props}/>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
export default ListCompanyHelmets;
