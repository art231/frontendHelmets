import React, { useState, useEffect } from "react";
import _ from "lodash";

const Sidepanel = ({ children }) => {
  const closeModal = () => {
    $('#sidepanelModal').modal('hide');
  };

  return(
    <div
      className="modal fade modal-fixed-right modal-theme overflow-hidden"
      id="sidepanelModal"
      role="dialog"
      tabIndex="-1"
      aria-labelledby="sidepanelModalLabel"
      aria-hidden="true"
      onClick={closeModal}>
      <div className="modal-dialog modal-dialog-vertical" role="document">
        <div className="modal-content border-0 vh-100 scrollbar perfect-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Sidepanel;