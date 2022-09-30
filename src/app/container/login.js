import React from "react";
import { connect } from 'react-redux';
import Login from "../components/auth/login";
import {putAuth} from "../redux/actions";

const mapStateToProps = state => {
    return {
        state,
        error: state.auth && state.auth.error,
        loading: state.auth && state.auth.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    putAuth: (data) => dispatch(putAuth(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
