import React, { Component } from "react";
import _ from "lodash";

class DeleteHelmetModal extends Component {
  state = {
    helmet: {
      serial: 0,
      companyId: 0,
    },
  };
  componentDidUpdate(prevProps) {
    let { company, helmet } = this.props;
    if (prevProps.helmet !== helmet) {
      this.setState({
        helmet: { serial: helmet.serial, companyId: company.id },
      });
      if(prevProps.deleteHelmetError!==this.props.deleteHelmetError){
        this.props.getListHelmets(company.id);
      }
    }
  }
  deleteHelmet() {
    let { helmet } = this.state;
    this.props.deleteHelmetFunc(helmet);
  }
  render() {
    return (
      <div
        className="modal fade"
        id="DeleteHelmetModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="DeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title m-auto" id="DeleteModalLabel">
                Каска будет удалена из компании,
                <br /> но останется в системе!
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
                onClick={() => this.deleteHelmet()}
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
export default DeleteHelmetModal;
