import React from "react";
import { connect } from 'react-redux';
import ReportCard from "../components/reports/reportCard";
import { getListGeofences, getReportCard, getListCompanies } from '../redux/actions';
import {helmetsDictSortByIncreaseSerial, itemsSortByIncreaseSerial, listCompaniesWithRoleId3} from '../common/selectorsHelper';

const mapStateToProps = state => {
    return {
        state,
        listGeofences: state.listGeofences && state.listGeofences.listGeofences && state.listGeofences.listGeofences.data,
        errorGeofences: state.listGeofences && state.listGeofences.error,
        loadingGeofences: state.listGeofences && state.listGeofences.loading,
        statsItems: state.reportCard && state.reportCard.reportCard && state.reportCard.reportCard.stats && state.reportCard.reportCard.stats.items && itemsSortByIncreaseSerial(state.reportCard.reportCard.stats.items),
        helmetsDict: state.reportCard && state.reportCard.reportCard && state.reportCard.reportCard.helmetsDict && helmetsDictSortByIncreaseSerial(state.reportCard.reportCard.helmetsDict),
        errorReportCard: state.reportCard && state.reportCard.error,
        loadingReportCard: state.reportCard && state.reportCard.loading,
        companies: state.listCompanies && state.listCompanies.listCompanies.data && listCompaniesWithRoleId3(state.listCompanies.listCompanies.data),
        errorCompanies: state.listCompanies && state.listCompanies.error,
        loadingCompanies: state.listCompanies && state.listCompanies.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getCompanies: () => dispatch(getListCompanies()),
    getGeofences: (companyId) => dispatch(getListGeofences(companyId)),
    getReportCard: (companyId, geofenceId, from, to) => dispatch(getReportCard(companyId, geofenceId, from, to)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportCard);
