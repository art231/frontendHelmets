import React, { Component } from "react";
import { Link } from "react-router-dom";
import main from '../../../scss/style.scss'

export default class Loader extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={main.Ldsripple}>
                    <div></div>
                    <div></div>
                </div>
            </React.Fragment>
        );
    }
}
