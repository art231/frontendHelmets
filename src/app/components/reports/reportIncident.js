import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import {dataTables} from "../../common/dataTables";
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";
import Calendar from "../calendar/calendar"
import MapZone from "../../../assets/img/diwo/map-report-incident.png";


class ReportIncident extends Component {

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



        if(!this.state.loading) {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 ">
                            <div className="card p-3">
                                <h3 className="text-center mb-3">Период</h3>
                                <form>
                                    <div className="form-group form-check">
                                        <div className="input-group mb-3">
                                            <input className="form-control text-center form-control-height-min"
                                                   type="text" placeholder="15.09.2020 16:18"
                                                   aria-label="15.09.2020 16:18" aria-describedby="basic-addon1"/>
                                        </div>

                                    </div>
                                </form>

                                <Calendar/>

                                <div className="text-center mt-4">
                                    <button className="w-100 btn btn-falcon-default mr-1 mb-1" type="button">Показать
                                        только подтверждённые и неразобранные случаи
                                    </button>
                                    <button className="w-100 mt-2 btn btn-falcon-default mr-1 mb-1"
                                            type="button">Показать всё
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 mb-3">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-4 col-sm-auto d-flex align-items-center pr-0">
                                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Происшествия</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="falcon-data-table">
                                        <table className="table table-sm mb-0 fs--1 border-bottom border-200">
                                            <thead className="bg-200 text-900">
                                            <tr>
                                                <th style={{minWidth: '150px'}}>Тип события</th>
                                                <th>Время события</th>
                                                <th style={{minWidth: '200px'}}>ФИО сотрудника</th>
                                                <th>Комментарий сотрудника</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        SOS
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020 12:30</td>
                                                <td className="py-3">Петров А.А.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>
                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        Удар 4 ур.
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">17.10.2020 12:53</td>
                                                <td className="py-3">Иванов В.А.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>
                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        Удар 2 ур.
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">18.10.2020 13:21</td>
                                                <td className="py-3">Сергеев В.Ч.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>
                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        Удар 1 ур.
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">19.10.2020 13:34</td>
                                                <td className="py-3">Станиславович Б.Д.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        Удар 3 ур.
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">20.10.2020 14:17</td>
                                                <td className="py-3">Мухамедов П.П.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>
                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        SOS
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">21.10.2020 14:29</td>
                                                <td className="py-3">Селезнев С.Д.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>
                                            <tr className="btn-reveal-trigger">
                                                <td className="py-2 align-middle white-space-nowrap">
                                                    <Link to="/list-incident/id">
                                                        Удар 4 ур.
                                                    </Link>
                                                </td>
                                                <td className="py-3 text-center">22.10.2020 15:30</td>
                                                <td className="py-3">Свистунов П.Ч.</td>
                                                <td className="py-3">Сотрудник сообщил о травме</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}
export default ReportIncident;

