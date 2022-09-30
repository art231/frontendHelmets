import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png"

class Dashboard extends Component {
    render() {

        return (
            <div className="content">
                <div className="card">
                    <div className="card-body overflow-hidden p-lg-6">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-6"><img className="img-fluid"
                                                           src={img} alt="" /></div>
                            <div className="col-lg-6 pl-lg-5 my-5 text-center text-lg-left">
                                <h3>Начните работу с касками!</h3>
                                <p className="lead">Начните мониторинг своих сотрудников сейчас</p><Link
                                className="btn btn-falcon-primary" to="/list-helmets">Начать</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
