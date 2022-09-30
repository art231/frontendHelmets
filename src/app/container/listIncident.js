import React from "react";
import { connect } from 'react-redux';
import ListIncident from "../components/list_Incident/listIncident";
import {getListIncidents, getNowIncidents} from "../redux/actions";

const mapStateToProps = state => {
    // console.log('state', state)

    return {
        state,
        listIncidents: state.listIncidents && state.listIncidents.listIncidents,
        oldestReceiptTime: state.listIncidents && state.listIncidents.listIncidents.oldestReceiptTime,
        errorList: state.listIncidents && state.listIncidents.error,
        errorIncident: state.incident && state.incident.error,
        loading: state.listIncidents && state.listIncidents.loading,
        incident: state.incident && state.incident.incident,
        pooling: state.incident && state.incident.start
    };
};

const mapDispatchToProps = dispatch => ({
    getListIncidents: (to, take) => dispatch(getListIncidents(to, take)),
    getNowIncidents: () => dispatch(getNowIncidents()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListIncident);
