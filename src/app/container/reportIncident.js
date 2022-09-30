import React from "react";
import { connect } from 'react-redux';
import ReportIncident from "../components/reports/reportIncident";

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
)(ReportIncident);
