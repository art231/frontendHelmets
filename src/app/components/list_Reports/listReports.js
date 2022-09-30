import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import { dataTables } from "../../common/dataTables";
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";

class ListReports extends Component {

    state = {
        error: undefined,
        loading: true,
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            loading: false,
        }), 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        if (!this.state.loading) {
            return (
                <div className="card p-4" style={{height:"67vh"}}>
                    <div class="row">
                        <div class="col-sm-6 col-lg-4 mb-4">
                            <div class="card bg-light h-100">
                                <Link to="/list-reports/active" class="card-block stretched-link text-decoration-none text-secondary">
                                    <div class="card-body">
                                        <div class="card-title text-center overflow-hidden">Количество работников по дням</div>
                                        <p class="card-text"></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 mb-4">
                            <div class="card bg-light h-100">
                                <Link to="/list-reports/card" class="card-block stretched-link text-decoration-none text-secondary">
                                    <div class="card-body">
                                        <div class="card-title text-center overflow-hidden">Табель рабочего времени</div>
                                        <p class="card-text"></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 mb-4">
                            <div class="card bg-light h-100">
                                <Link to="/list-reports/geofences" class="card-block stretched-link text-decoration-none text-secondary">
                                    <div class="card-body">
                                        <div class="card-title text-center overflow-hidden">Работники по объектам</div>
                                        <p class="card-text"></p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div >
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}
export default ListReports;
