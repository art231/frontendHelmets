import React from "react";
import { connect } from 'react-redux';
import Layout from "../components/layout/layout.js";
import {logout} from "../redux/actions";
import {sliceArr} from '../common/selectorsHelper';
import {getListIncidents, getNowIncidents} from "../redux/actions";

const mapStateToProps = state => {

    return {
        state,
        authenticated: state.auth && state.auth.authenticated,
        listIncidents: state.listIncidents && state.listIncidents.listIncidents,
        errorList: state.listIncidents && state.listIncidents.error,
        loading: state.listIncidents && state.listIncidents.loading,
        incident: state.incident && state.incident.incident,
        polling: state.incident && state.incident.start,
        errorIncident: state.incident && state.incident.error,
        oldestReceiptTime: state.listIncidents && state.listIncidents.listIncidents.oldestReceiptTime,
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    getListIncidents: (to, take) => dispatch(getListIncidents(to, take)),
    getNowIncidents: () => dispatch(getNowIncidents()),

});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Layout);
