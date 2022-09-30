import React from "react";
import { connect } from 'react-redux';
import ReportActive from "../components/reports/reportActive";
import { getListCompanies, getListGeofences, getGroupReport} from '../redux/actions';
import {listCompaniesWithRoleId3} from '../common/selectorsHelper';


const mapStateToProps = state => {
    return {
        state,
        listGeofences: state.listGeofences && state.listGeofences.listGeofences && state.listGeofences.listGeofences.data,
        errorGeofences: state.listGeofences && state.listGeofences.error,
        loadingGeofences: state.listGeofences && state.listGeofences.loading,
        groupStatsItemsWithoutGeofence: state.reportActive && state.reportActive.groupStatsItemsWithoutGeofence && state.reportActive.groupStatsItemsWithoutGeofence.items,
        groupStatsItemsWithGeofence: state.reportActive && state.reportActive.groupStatsItemsWithGeofence && state.reportActive.groupStatsItemsWithGeofence.items,
        errorGroupStats: state.reportActive && state.reportActive.error,
        loadingGroupStats: state.reportActive && state.reportActive.loading,
        companies: state.listCompanies && state.listCompanies.listCompanies.data && listCompaniesWithRoleId3(state.listCompanies.listCompanies.data),
        errorCompanies: state.listCompanies && state.listCompanies.error,
        loadingCompanies: state.listCompanies && state.listCompanies.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getCompanies: () => dispatch(getListCompanies()),
    getGeofences: (companyId) => dispatch(getListGeofences(companyId)),
    getGroupReport: (companyId, geofenceId, from, to) => dispatch(getGroupReport(companyId, geofenceId, from, to)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportActive);
