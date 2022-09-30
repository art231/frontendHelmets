import React from "react";
import { connect } from 'react-redux';
import Incident from "../components/incident/incident";

const mapStateToProps = state => {
    return {
        state,
    };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Incident);
