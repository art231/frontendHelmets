import React, { Component } from "react";
import Main from "./router.container"


export default class App extends Component {
    render() {
        return (
            <Main {...this.props} />
        );
    }
}
