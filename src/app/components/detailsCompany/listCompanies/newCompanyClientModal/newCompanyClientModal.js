import React, { Component } from "react";
import _ from "lodash";
import { createCompany } from "../../../../redux/actions";

class NewCompanyClientModal extends Component {
  state = {
    company: {
      name: "",
    },
    createCompanyValue: false,
    createCompanyErrorValue: false,
  };
  handleChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      company: {
        [name]: value,
      },
    });
  };
  componentDidUpdate(prevProps) {
    let { createCompany, createCompanyError } = this.props;
    if (
      prevProps.createCompany !== createCompany &&
      createCompanyError === "ОК"
    ) {
      this.setState({ createCompanyValue: true });
    }
    if (
      prevProps.createCompany !== createCompany &&
      createCompanyError !== "ОК"
    ) {
      this.setState({ createCompanyErrorValue: true });
    }
  }

  updateCompany() {
    let { company } = this.state;
    let data = {
      companyId: this.props.company.id,
      name: company.name,
      roleId: 3,
    };
    this.props.createCompanyFunc(data);
  }

  closeModal() {
    this.props.getListCompanies("Customer");
  }
  render() {
    let { company, createCompanyValue, createCompanyErrorValue } = this.state;
    let { createCompanyError } = this.props;
    return (
      <div>
        <div
          className="modal fade"
          id="NewCompanyClientModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="UpdateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title m-auto" id="UpdateModalLabel">
                  Создать компанию клиент
                </h4>
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
                  <input
                    value={company.name || ""}
                    name="name"
                    placeholder="Название компании"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  {createCompanyErrorValue ? (
                    <label>
                      <h3 className="text-danger">{createCompanyError}</h3>
                    </label>
                  ) : null}
                  {createCompanyValue ? (
                    <label>
                      <h3 className="text-success">Компания успешно создана</h3>
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  hidden={createCompanyValue}
                  id="modal-closed"
                  className="btn btn-success btn-sm"
                  type="button"
                  onClick={() => this.updateCompany()}
                  data-dismiss="modal"
                >
                  Создать
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => this.closeModal()}
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
export default NewCompanyClientModal;
