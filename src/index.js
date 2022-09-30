import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./app/redux/stores";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./scss/style.scss";
import { makeServer } from "../src/app/server"

if (process.env.NODE_ENV === "development") {
    // makeServer({ environment: "development" })
}

const store = configureStore({ history });

render(
    <Provider store={store}>
        <BrowserRouter>
            <App history={history} />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
