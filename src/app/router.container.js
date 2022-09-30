import React from "react";
import { connect } from 'react-redux';
import Main from "./router";

const mapStateToProps = state => {
    return {
        state,
        authenticated: state.auth && state.auth.authenticated
    };
};

export default connect(
    mapStateToProps
)(Main);
