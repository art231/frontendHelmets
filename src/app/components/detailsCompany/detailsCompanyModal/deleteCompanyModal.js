import React, { Component } from "react";
import _ from "lodash";

class DeleteCompanyModal extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.deleteCompany.error !== this.props.deleteCompany.error) {
      this.props.history.push("/companies");
    }
  }
  delete() {
    this.props.deleteCompanyFunc(this.props.company);
  }
  render() {
    return (
      <div
        className="modal fade"
        id="DeleteCompanyModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="DeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="DeleteModalLabel">
                Удалить можно только пустую компанию,
                <br /> то есть у которой нет привязанных объектов
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
                onClick={() => this.delete()}
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
export default DeleteCompanyModal;
