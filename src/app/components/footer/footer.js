import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="no-gutters justify-content-between fs--1 mt-4 mb-3 mt-sm-5">
                    <div className="col-12 col-sm-auto text-center">
                        <p className="mb-0 text-600">Общество с ограниченной ответственностью “Digital World”
                            ОГРН 1207700203017, г. Москва, 121357, г. Москва, Верейская ул., д. 29, строение 151, офис 45 <span
                            className="d-none d-sm-inline-block">| </span><br
                            className="d-sm-none"/> 2020 &copy; <Link
                            to="/">DiWo</Link></p>
                    </div>
                    <div className="col-12 col-sm-auto text-center">
                        <p className="mb-0 text-600"></p>
                    </div>
                </div>
            </footer>
        );
    }
}
