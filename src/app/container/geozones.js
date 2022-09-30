import React from "react";
import { connect } from 'react-redux';
import Geozones from "../components/geozones/geozones.js";
import { getListGeozones, getListCompanies } from "../redux/actions";
import {listCompaniesWithRoleId3} from '../common/selectorsHelper';

const mapStateToProps = state => {
    console.log(state);
    return {
        state,
        error: state.geozones && state.geozones.error,
        listGeozones: state.geozones && state.geozones.listGeozones,
        loading: state.geozones && state.geozones.loading,
        companies: state.listCompanies && state.listCompanies.listCompanies.data && listCompaniesWithRoleId3(state.listCompanies.listCompanies.data),
        errorCompanies: state.listCompanies && state.listCompanies.error,
        loadingCompanies: state.listCompanies && state.listCompanies.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getCompanies: () => dispatch(getListCompanies()),
    getListGeozones: (companyId) => dispatch(getListGeozones(companyId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Geozones);
