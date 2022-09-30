import React from "react";
import { connect } from 'react-redux';
import ListReports from "../components/list_Reports/listReports.js";

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
)(ListReports);
