import React from "react";
import { connect } from 'react-redux';
import { postGeozone, deleteGeozone } from "../redux/actions";
import Geozone from "../components/geozones/geozone.js";

const mapStateToProps = state => {

    console.log("_________state_to_props");
    console.log(state.geozone);
    return {
        state,
        error: state.geozone && state.geozone.error,
        loading: state.geozone && state.geozone.loading,
        deleted: state.geozone.deleted,
        created: state.geozone.created,
    };
};

const mapDispatchToProps = dispatch => ({
    postGeozone: (geozone) => dispatch(postGeozone(geozone)),
    deleteGeozone: (id) => dispatch(deleteGeozone(id)),
    cleanGeozone: () => dispatch({type: "CLEAN_GEOZONE", deleted: false, created: false}),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Geozone);
