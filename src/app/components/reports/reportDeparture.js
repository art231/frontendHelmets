import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import {dataTables} from "../../common/dataTables";
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";
import Calendar from "../calendar/calendar"
import MapZone from "../../../assets/img/diwo/map-departure.jpg";


class ReportDeparture extends Component {

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
                    <div className="card-deck">
                        <div className="col-md-4 col-sm-12 card mb-3 overflow-hidden">
                            <div className="card-body position-relative">
                                <h3 className="text-center mb-3">Объект</h3>
                                <form>
                                    <div className="form-group form-check">
                                        <div className="input-group mb-0">
                                            <input className="form-control text-center form-control-height-min"
                                                   type="text" placeholder="Площадка 1"
                                                   aria-label="Площадка 1" aria-describedby="basic-addon1"/>
                                        </div>

                                    </div>
                                </form>
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
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 mb-3 overflow-hidden">
                            <div className="position-relative h-100">
                                <img className="h-100" src={MapZone} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="card-deck">
                        <div className="col-md-12 col-sm-12 card mb-3 overflow-hidden">
                            <div className="card-body position-relative">

                                <div className="row">
                                    <div className="col-9">
                                        <table className="table table-hover">
                                            <thead className="fs--2">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                                <th scope="col">Кол-во активных касок внутри объекта</th>
                                                <th scope="col">Суммарно время активности касок внутри объекта</th>
                                                <th scope="col">Кол-во активных касок вне объекта</th>
                                                <th scope="col">Суммарно время активности касок вне объекта</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th></th>
                                                <th>ИТОГО</th>
                                                <td className="text-right">28</td>
                                                <td className="text-right">773</td>
                                                <td className="text-right">15</td>
                                                <td className="text-right">152</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-3 text-right">
                                        <button className="btn btn-falcon-default mr-1 mb-1" type="button">
                                            Вывести треки
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-800 mt-0" />

                                    <div className="falcon-data-table">
                                        <table
                                            className="table table-hover table-sm mb-0 fs--1 border-bottom border-200">
                                            <thead>
                                            <tr>
                                                <th className="align-middle no-sort pr-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input checkbox-bulk-select"
                                                               id="checkbox-bulk-customers-select" type="checkbox"
                                                               data-checkbox-body="#customers"
                                                               data-checkbox-actions="#customers-actions"
                                                               data-checkbox-replaced-element="#customer-table-actions"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="checkbox-bulk-customers-select"></label>
                                                    </div>
                                                </th>
                                                <th className="align-middle">Дата</th>
                                                <th className="align-middle">ФИО сотрудинка</th>
                                                <th className="align-middle" style={{minWidth: '150px'}}>Время входа в объект</th>
                                                <th className="align-middle" style={{minWidth: '150px'}}>Время выхода из объекта</th>
                                                <th className="align-middle">Cуммарное время активности каски внутри объекта</th>
                                                <th className="align-middle">Cуммарное время активности каски</th>
                                                <th className="align-middle">Количество входов и выходов</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-0"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-0"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">
                                                    16.10.2020
                                                </td>
                                                <td className="py-3">Иванов С.Д.</td>
                                                <td className="py-3 text-center">16.10.2020 13:20</td>
                                                <td className="py-3 text-center">16.10.2020 17:20</td>
                                                <td className="py-3 text-right">3ч.</td>
                                                <td className="py-3 text-right">1ч</td>
                                                <td className="py-3 text-right">0</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-1"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-1"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Мухамедов Ш.Ш</td>
                                                <td className="py-3 text-center">16.10.2020 14:20</td>
                                                <td className="py-3 text-center">16.10.2020 19:20</td>
                                                <td className="py-3 text-right">4ч.</td>
                                                <td className="py-3 text-right">2ч</td>
                                                <td className="py-3 text-right">1</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-2"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-2"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Петров Б.Д.</td>
                                                <td className="py-3 text-center">16.10.2020 14:20</td>
                                                <td className="py-3 text-center">16.10.2020 21:20</td>
                                                <td className="py-3 text-right">6ч.</td>
                                                <td className="py-3 text-right">3ч</td>
                                                <td className="py-3 text-right">2</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-3"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-3"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Бэдченко С.С.</td>
                                                <td className="py-3 text-center">16.10.2020 11:20</td>
                                                <td className="py-3 text-center">16.10.2020 15:20</td>
                                                <td className="py-3 text-right">2ч.</td>
                                                <td className="py-3 text-right">0</td>
                                                <td className="py-3 text-right">1</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-4"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-4"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Куценко П.Ч.</td>
                                                <td className="py-3 text-center">16.10.2020 10:20</td>
                                                <td className="py-3 text-center">16.10.2020 13:20</td>
                                                <td className="py-3 text-right">1ч.</td>
                                                <td className="py-3 text-right">20мин.</td>
                                                <td className="py-3 text-right">3</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-4"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-4"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Михалков Ч.П.</td>
                                                <td className="py-3 text-center">16.10.2020 18:20</td>
                                                <td className="py-3 text-center">16.10.2020 19:20</td>
                                                <td className="py-3 text-right">40мин.</td>
                                                <td className="py-3 text-right">0</td>
                                                <td className="py-3 text-right">2</td>
                                            </tr>

                                            <tr className="btn-reveal-trigger py-2">
                                                <td className="py-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            className="custom-control-input checkbox-bulk-select-target"
                                                            type="checkbox" id="customer-checkbox-4"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customer-checkbox-4"></label>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-center">16.10.2020</td>
                                                <td className="py-3">Куканов Р.Р.</td>
                                                <td className="py-3 text-center">16.10.2020 9:20</td>
                                                <td className="py-3 text-center">16.10.2020 21:20</td>
                                                <td className="py-3 text-right">12ч.</td>
                                                <td className="py-3 text-right">2ч.</td>
                                                <td className="py-3 text-right">1</td>
                                            </tr>

                                            </tbody>
                                        </table>
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
export default ReportDeparture;

