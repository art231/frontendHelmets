import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

const DropdownGeofences = ({ listGeofences, geofence, onSetBounds, unSelectGeofance }) => {
  return (
    <div>
      <div
        className={[
          "dropdown d-flex justify-content-center",
          !_.isEmpty(listGeofences) ? "" : "disabled",
        ].join(" ")}
      >
        <button
          className="btn btn-primary dropdown-toggle w-100"
          type="button"
          id="dropdownGeofences"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {geofence.name || "Не выбрано"}
        </button>
        <div
          className={[
            "dropdown-menu w-100",
            !_.isEmpty(listGeofences) ? "" : "d-none",
          ].join(" ")}
          aria-labelledby="dropdownGeofences"
        >
          <span
            className="dropdown-item"
            role="button"
            onClick={() => {
              onSetBounds([])}}
          >
            Не выбрано
          </span>
          {!_.isEmpty(listGeofences)
            ? listGeofences.map((item) => (
                <span
                  className="dropdown-item"
                  role="button"
                  key={item.id}
                  onClick={() => onSetBounds(item.polygons)}
                >
                  {item.name}
                </span>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  listGeofences:
    state.listGeofences &&
    state.listGeofences.listGeofences &&
    state.listGeofences.listGeofences.data,
  loadingGeofences: state.listGeofences && state.listGeofences.loading,
});

export default connect(mapStateToProps)(DropdownGeofences);
