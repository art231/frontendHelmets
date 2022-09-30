import React, { Component } from "react";
import _ from "lodash";

class UpdateCompanyModal extends Component {
  state = {
    company: {
      ...this.props.company,
      name: this.props.company.name,
    },
  };
  handleChange = (event) => {
    event.preventDefault();
    let { company } = this.state;
    let { name, value } = event.target;
    this.setState({
      company: {
          ...company,
        [name]: value,
      },
    });
  };
  updateCompanyHandler() {
    let { company } = this.state;
    this.props.updateCompany(company);
    this.props.handleCompanyName(company.name);
  }
  render() {
    let { company } = this.state;
    let { updateCompanyError } = this.props;
    return (
      <div
        className="modal fade"
        id="UpdateCompanyModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="UpdateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="UpdateModalLabel">
                Изменить компанию
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
                <label htmlFor="name"></label>
                <input
                  value={company.name}
                  name="name"
                  onChange={(event) => this.handleChange(event)}
                  className="form-control"
                  id="name"
                  type="text"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="modal-closed"
                className="btn btn-success btn-sm"
                type="button"
                onClick={() => this.updateCompanyHandler()}
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
export default UpdateCompanyModal;
