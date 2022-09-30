import React, { Component } from "react";
import _ from "lodash";

class UpdateHelmetModal extends Component {
  state = {
    helmet: {
      name: "",
      serial: "",
      sim: "",
    },
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
  componentDidUpdate(prevProps) {
    let { helmet } = this.props;
    if (prevProps.helmet !== this.props.helmet) {
      this.setState({ helmet: helmet });
    }
    if (
      prevProps.updateHelmetError !== this.props.updateHelmetError &&
      this.props.updateHelmetError !== "ОК" &&
      this.props.updateHelmetError !== undefined
    ) {
      this.props.getListHelmets(this.props.company.id);
    }
  }
  update() {
    let { helmet } = this.state;
    this.props.updateHelmetFunc(0, helmet);
  }
  render() {
    let { helmet } = this.state;

    return (
      <div
        className="modal fade"
        id="UpdateHelmetModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="UpdateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="UpdateModalLabel">
                Изменить устройство
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
                <b>
                  Серийный номер {helmet.serial}
                  <br />
                </b>

                <label htmlFor="name"></label>
                <input
                  name="name"
                  value={helmet.name}
                  className="form-control"
                  id="name"
                  type="text"
                  onChange={(event) => this.handleChange(event)}
                />

                <label htmlFor="sim"></label>
                <input
                  name="sim"
                  value={helmet.sim}
                  className="form-control"
                  type="text"
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="modal-closed"
                className="btn btn-success btn-sm"
                type="button"
                onClick={() => this.update()}
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
export default UpdateHelmetModal;
