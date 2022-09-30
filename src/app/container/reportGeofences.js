import React from "react";
import { connect } from 'react-redux';
import ReportGeofences from "../components/reports/reportGeofences";
import { getListGeofences, getReportGeofences, getListCompanies } from '../redux/actions';
import {helmetsDictSortByIncreaseSerial, deleteNull, getNull, listCompaniesWithRoleId3} from '../common/selectorsHelper';

const mapStateToProps = state => {
    return {
        state,
        listGeofences: state.listGeofences && state.listGeofences.listGeofences && state.listGeofences.listGeofences.data,
        errorGeofences: state.listGeofences && state.listGeofences.error,
        loadingGeofences: state.listGeofences && state.listGeofences.loading,
        statsItemsWithoutNull: state.reportGeofences && state.reportGeofences.reportGeofences && state.reportGeofences.reportGeofences.stats && state.reportGeofences.reportGeofences.stats.items && deleteNull(state.reportGeofences.reportGeofences.stats.items),
        statsNullItem: state.reportGeofences && state.reportGeofences.reportGeofences && state.reportGeofences.reportGeofences.stats && state.reportGeofences.reportGeofences.stats.items && getNull(state.reportGeofences.reportGeofences.stats.items),
        helmetsDict: state.reportGeofences && state.reportGeofences.reportGeofences && state.reportGeofences.reportGeofences.helmetsDict && helmetsDictSortByIncreaseSerial(state.reportGeofences.reportGeofences.helmetsDict),
        errorReportGeofences: state.reportGeofences && state.reportGeofences.error,
        loadingReportGeofences: state.reportGeofences && state.reportGeofences.loading,
        companies: state.listCompanies && state.listCompanies.listCompanies.data && listCompaniesWithRoleId3(state.listCompanies.listCompanies.data),
        errorCompanies: state.listCompanies && state.listCompanies.error,
        loadingCompanies: state.listCompanies && state.listCompanies.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getCompanies: () => dispatch(getListCompanies()),
    getGeofences: (companyId) => dispatch(getListGeofences(companyId)),
    getReportGeofences: (companyId, from, to) => dispatch(getReportGeofences(companyId, from, to)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportGeofences);
