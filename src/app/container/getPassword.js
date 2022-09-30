import React from "react";
import { connect } from 'react-redux';
import GetPassword from "../components/auth/getPassword";
import {putAuth} from "../redux/actions";

const mapStateToProps = state => {
    return {
        state,
        email: state.auth && state.auth.email
    };
};

const mapDispatchToProps = dispatch => ({
    putAuth: (data) => dispatch(putAuth(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetPassword);
