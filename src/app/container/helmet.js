import React from "react";
import { connect } from 'react-redux';
import { getHelmet } from "../redux/actions";
import Helmet from "../components/helmet/helmet.js";

const mapStateToProps = state => {

    return {
        state,
        charge: state.helmet && state.helmet.helmet && state.helmet.helmet.condition  && state.helmet.helmet.condition.charge && state.helmet.helmet.condition.charge.condition,
        condition: state.helmet && state.helmet.helmet && state.helmet.helmet.condition,
        attributes: state.helmet && state.helmet.helmet && state.helmet.helmet.attributes,
        company: state.helmet && state.helmet.helmet && state.helmet.helmet.company,
        error: state.helmet && state.helmet.error,
        loading: state.helmet && state.helmet.loading,
        tz: state.helmet && state.helmet.tz,
    };
};

const mapDispatchToProps = dispatch => ({
    getHelmet: (id, date) => dispatch(getHelmet(id, date)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Helmet);
