import React, { Fragment } from "react";

const Error = ({ error }) => {
  return (
    <Fragment>
      {error
        ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Ошибка!</strong> {error}
            <button
              className="close"
              type="button"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span className="font-weight-light" aria-hidden="true">
                ×
              </span>
            </button>
          </div>
        )
        : null
      }
    </Fragment>
  )
}

export default Error;
