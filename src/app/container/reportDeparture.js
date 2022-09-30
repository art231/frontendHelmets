import React from "react";
import { connect } from 'react-redux';
import ReportDeparture from "../components/reports/reportDeparture";

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
)(ReportDeparture);
