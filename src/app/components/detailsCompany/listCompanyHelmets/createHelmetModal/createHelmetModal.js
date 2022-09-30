import React, { Component } from "react";
import _ from "lodash";

class CreateHelmetModal extends Component {
  state = {
    helmet: {
      companyId: this.props.company.id,
      serial: null,
      name: "",
      sim: null,
    },
    createHelmetValue: false,
    createHelmetErrorValue: false,
  };
  handleChange = (event) => {
    event.preventDefault();
    let { name, value } = event.target;
    let { helmet } = this.state;
    this.setState({
      helmet: {
        ...helmet,
        [name]: value,
      },
    });
  };

  existHelmetHandler() {
    let { helmet } = this.state;

    this.props.checkExistHelmetFunc(helmet);
    let { checkExistHelmet } = this.props;
    if (checkExistHelmet.error === "Unknown") {
      this.props.createHelmetFunc(helmet);
    }
  }
  updateWindow() {
    let { company } = this.props;
    this.props.getListHelmets(company.id);
  }

  componentDidUpdate(prevProps) {
    let { createHelmet, createHelmetError, company } = this.props;
    if (prevProps.createHelmet !== this.props.createHelmet) {
      let data = { companyId: company, helmet: createHelmet };
      this.props.bindHelmetFunc(data);
    }
    if (
      prevProps.createHelmetError !== createHelmetError &&
      createHelmetError === "ОК"
    ) {
      this.setState({ createHelmetValue: true });
    }
    if (
      prevProps.createHelmetError !== createHelmetError &&
      createHelmetError !== "ОК"
    ) {
      this.setState({ createHelmetErrorValue: true });
    }
  }
  render() {
    let { helmet, createHelmetValue, createHelmetErrorValue } = this.state;
    let { checkExistHelmet } = this.props;
    let ifExist = true;
    let newUser = true;
    if (checkExistHelmet.error === "Exists") {
      ifExist = false;
    }
    if (checkExistHelmet.error === "Unknown") {
      newUser = false;
    }

    return (
      <div>
        <div
          className="modal fade"
          id="CreateHelmetModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="UpdateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title m-auto" id="UpdateModalLabel">
                  Добавить новое устройство
                </h4>
                <button
                  className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                  onClick={() => this.updateWindow()}
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
                  <h5 className="font-weight-medium" hidden={ifExist}>
                    Вы добавляете существующую каску.
                  </h5>
                  <input
                    value={helmet.serial || ""}
                    name="serial"
                    placeholder="Serial"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  <label></label>
                  <input
                    hidden={newUser}
                    value={helmet.name || ""}
                    name="name"
                    placeholder="Название"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  <label></label>
                  <input
                    hidden={newUser}
                    value={helmet.sim || ""}
                    name="sim"
                    placeholder="Sim"
                    onChange={(event) => this.handleChange(event)}
                    className="form-control"
                    type="text"
                  />
                  {createHelmetErrorValue ? (
                    <label>
                      <p className="text-danger">{createHelmetError}</p>
                    </label>
                  ) : null}
                  {createHelmetValue ? (
                    <label>
                      <h3 className="text-success">Каска успешно создана</h3>
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  hidden={createHelmetValue}
                  id="modal-closed"
                  className="btn btn-success btn-sm"
                  type="button"
                  onClick={() => this.existHelmetHandler()}
                >
                  Создать
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => this.updateWindow()}
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
export default CreateHelmetModal;
