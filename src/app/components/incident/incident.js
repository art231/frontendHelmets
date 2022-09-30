import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import {dataTables} from "../../common/dataTables";
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";
import Flatpickr from "react-flatpickr";
import {dateOneHourAgo} from "../../common/dateHelper";

class Incident extends Component {

    state = {
        error: undefined,
        loading: true,
        date: {
            valueFrom: dateOneHourAgo(),
            valueTo: new Date(),
            request: {
                from: new Date(),
                to: new Date(),
            },
            select: undefined,
        },
    }

    componentDidMount() {
        setTimeout(() =>
            this.setState({
            loading: false,}

            ), 1000);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        let {attributes, tracks, timelines, events, error, date, stepMinutes, company} = this.state;

        if(!this.state.loading) {
            return (
                <React.Fragment>
                    <div className="row no-gutters mb-3">
                        <div className="col-lg-4 pr-lg-5 col-md-12">
                            <div className="card h-100">
                                <div className="card-header d-inline-block align-middle form-group">
                                    <div className="list-group-flush mt-1">
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-0 font-weight-semi-bold border-top-0">
                                            <p className="mb-0">Каска</p>
                                            <p className="mb-0"></p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{borderColor: 'rgba(255, 255, 255, 0.05)'}}>
                                            <p className="mb-0">Название</p>
                                            <p className="mb-0 text-dark">Каска LM - 1</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{borderColor: 'rgba(255, 255, 255, 0.05)'}}>
                                            <p className="mb-0">Компания</p>
                                            <p className="mb-0 text-dark">Компания 1</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{borderColor: 'rgba(255, 255, 255, 0.05)'}}>
                                            <p className="mb-0">Серийный номер</p>
                                            <p className="mb-0 text-dark text-right">0123456789ABCDEF-1232131</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{borderColor: 'rgba(255, 255, 255, 0.05)'}}>
                                            <p className="mb-0">SIM</p>
                                            <p className="mb-0 text-dark">+79261137749</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 pr-lg-5 col-md-12 mb-2">
                            <div className="card h-100">
                                <div className="card-body d-inline-block align-middle form-group">
                                    <span className="badge badge-soft-info mb-2 float-right">Выбрано: {date.select}</span>
                                    <label htmlFor="datetimepickerFrom">Выберите дату время начала</label>
                                    <Flatpickr
                                        data-enable-time
                                        value={date.valueFrom}
                                        options={{ dateFormat: "d.m.y H:i", enableTime: true}}

                                        onChange={(dates, dateStr, instance) => this.datePickerFrom(dates, dateStr, instance)}

                                        className="form-control datetimepicker"
                                        id="datetimepickerFrom"
                                    />
                                    <label className="mt-2" htmlFor="datetimepickerTo">Выберите дату время начала</label>
                                    <Flatpickr
                                        data-enable-time
                                        value={date.valueTo}
                                        options={{ dateFormat: "d.m.y H:i", enableTime: true}}

                                        onChange={(dates, dateStr, instance) => this.datePickerTo(dates, dateStr, instance)}

                                        className="form-control datetimepicker"
                                        id="datetimepickerTo"
                                    />
                                    <button onClick={() => this.getHistoryHelmet()} className="btn btn-info d-block mt-2">Применить</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-lg-12 mb-3">
                            <div className="card">

                                <div className="card-body d-flex align-items-center">
                                    <div className="w-100">
                                        <div>
                                            Одета
                                            <div id="dressed" style={{height: '100px'}}></div>
                                        </div>
                                        <div>
                                            Режим работы
                                            <div id="operating" style={{height: '100px'}}></div>
                                        </div>
                                        <div>
                                            Онлайн
                                            <div id="online" style={{height: '100px'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-lg-12 col-md-12 mb-3">

                            <div className="card overflow-hidden">
                                <div id="helmet-map" style={{height: '415px'}}></div>
                            </div>

                        </div>
                    </div>


                    <div className="row no-gutters">
                        <div className="col-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-6 col-sm-auto d-flex align-items-center pr-0">
                                            <h5 className="fs-0 mb-0 text-nowrap py-2">События каски</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-0 pt-0">
                                    <div className="dashboard-data-table">
                                        <table className="table table-sm table-dashboard fs--1 data-table border-bottom"
                                               data-options='{"responsive":false,"pagingType":"simple","lengthChange":false,"searching":false,"pageLength":20,"columnDefs":[{"orderable":false}],"language":{"info":"с _START_ по _END_ из доступных _TOTAL_"},"buttons":["copy","excel"]}'>
                                            <thead className="bg-200 text-900">
                                            <tr>
                                                <th className="sort pr-1 align-middle">Дата и время события</th>
                                                <th className="sort pr-1 align-middle">Описание события</th>
                                            </tr>
                                            </thead>
                                            <tbody id="purchases">
                                            <tr className="btn-reveal-trigger">
                                                <td className="align-middle">20.09.2020 15:30</td>
                                                <td className="align-middle text-warning">SOS</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-right px-2">
                                        <button className="btn btn-primary mr-1 mb-1" type="button">
                                            Сохранить
                                        </button>
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
export default Incident;

