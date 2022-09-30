import { connect } from 'react-redux';
import { getListCompanies } from "../redux/actions";
import ListCompanies from "../components/list_Companies/listCompanies.js";

const mapStateToProps = state => {
    return {
        errorList: state.listCompanies && state.listCompanies.error,
        listCompanies: state.listCompanies.listCompanies
    };
};

const mapDispatchToProps = dispatch => ({
    getListCompanies: () => dispatch(getListCompanies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCompanies);