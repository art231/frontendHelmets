import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteElement } from '../../common/elementHelper'
import Loader from "../loader/loader";
import _ from "lodash";
import { dateInMoscow, dateInUTC, timeConverter, getRoundToHour, dateWithTZ } from '../../common/dateHelper';
import Flatpickr from "react-flatpickr";
import moment from "moment-timezone";

import on_unknown_unknown from '../../../assets/img/diwo/on_unknown_unknown.png';
import unknown_unknown_unknown from '../../../assets/img/diwo/unknown_unknown_unknown.png';
import off_unknown_unknown from '../../../assets/img/diwo/off_unknown_unknown.png';

class Helmet extends Component {

    state = {
        serial: undefined,
        condition: {
            blueTooth: {},
            charge: {},
            condition: {},
            gps: {},
            on: {},
            online: {},
            pressure: {},
            temperature: {},
            motion: {},
            tz: {}
        },
        charge: {},
        company: undefined,
        attributes: {},
        date: {
            value: new Date(),
            request: dateInUTC(new Date()),
            select: undefined,
        },
        counter: 0,
        error: undefined,
        gpsPoint: [0, 0],
        map: '',
        interval: null,
    };

    componentDidMount() {
        let date = { ...this.state.date };
        let location = this.props.history.location.search;
        let search = '';
        if (location !== '') {
            let position_To = location.search('To');
            search = (location !== '') ? location.slice(position_To + 3, location.length) : null;
            search = dateInUTC(search)
            date.request = dateInUTC(search);
            date.value = dateInUTC(search);
            date.select = dateInUTC(search);
        }

        this.pollForData(this.props.match.params.id, search);
        this.props.getHelmet(this.props.match.params.id, search);

        this.setState({
            serial: this.props.match.params.id,
            date,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { condition, attributes } = this.state;

        if (this.props.attributes !== prevProps.attributes && this.props.condition) {
            this.setState({
                condition: this.props.condition,
                attributes: this.props.attributes,
                loading: this.props.loading,
                charge: this.props.charge,
            })

        }

        if (!this.state.loading && this.props.error && this.props !== prevProps) {
            this.props.history.push(`?`)
            // this.props.getHelmet(this.props.match.params.id);
            this.pollForData(this.props.match.params.id);

            this.setState({
                error: this.props.error,
                date: {
                    value: new Date(),
                    request: new Date(),
                    select: undefined,
                },
            })
        }

        if (!_.isEmpty(this.props.company) && this.state.company === undefined) {
            for (let key in this.props.company) {
                // if(this.state.attributes.distributorCompanyId === Number(key)) {
                //
                // }
                this.setState({
                    company: this.props.company.name
                })
            }
        }

        if (!this.state.loading && !_.isEmpty(attributes) && !_.isEmpty(condition)) {
            deleteElement("", "mount")
        }

        if (!this.state.loading && !_.isEmpty(condition)) {

            let gpsPoint = condition.gps && condition.gps.condition && condition.gps.condition.point || [0, 0];
            if (this.state.gpsPoint[0] !== gpsPoint[0]) {
                this.setState({
                    gpsPoint
                })
            }
        }
    }

    componentWillUnmount() {
        deleteElement("height: 390px", "unmount");
        clearInterval(this.state.interval);
    }


    pollForData = (id, date) => {
        // First clear old interval if one exists
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }
        this.state.interval = setInterval(
            () => this.props.getHelmet(id, date),
            5000
        );
    }

    datePicker = (dates, dateStr, instance) => {
        let date = { ...this.state.date };
        date.request = dateInUTC(dates[0]);
        date.value = dates

        this.props.history.push(`?To=${dateInMoscow(dates[0], 'query')}`)

        this.setState({
            date
        })
    }

    getHelmetDate = () => {
        let date = { ...this.state.date };

        clearInterval(this.state.interval);
        this.props.getHelmet(this.props.match.params.id, this.state.date.request);

        date.select = this.state.date.request

        this.setState({
            date
        })
    }

    getNowHelmetDate = () => {
        let date = { ...this.state.date };
        date.select = undefined;
        date.request = new Date();
        date.value = new Date()
        this.pollForData(this.props.match.params.id);
        // this.props.getHelmet(this.props.match.params.id, dateInUTC(new Date()));

        this.props.history.push(`?`)

        this.setState({
            date
        })
    }

    CenterComponent(props) {
        const map = useMap();
        map.setView(props.center, 16);
        return null;
    }

    render() {
        let { condition, attributes, date, error, company, charge, gpsPoint } = this.state;

        var chargeColor = "#FF0000";
        if (charge) {
            if (charge.percent > 80) {
                chargeColor = "#24FF00";
            }
            if (charge.percent <= 80 && charge.percent > 60) {
                chargeColor = "#A4FF00";
            }
            if (charge.percent <= 60 && charge.percent > 30) {
                chargeColor = "#FF6B00";
            }
            if (charge.percent < 30) {
                chargeColor = "#FF0000";
            }
        }

        if (!this.state.loading && !_.isEmpty(attributes)) {
            let { gps, online, on, pressure, temperature, blueTooth, motion, distance, tz } = condition;

            return (
                <Fragment>

                    {(error) ?
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> {error}
                            <button className="close" type="button" data-dismiss="alert" aria-label="Close"><span
                                className="font-weight-light" aria-hidden="true">×</span></button>
                        </div>
                        : null
                    }

                    <div className="card-deck">
                        <div className="col-md-6 col-sm-12 card mb-3 overflow-hidden">
                            <div className="bg-holder bg-card"></div>
                            <div className="card-body position-relative">
                                <h6 className="fs-1">{attributes.name}
                                    <span className="ml-2">/ Компания {company}</span></h6>
                                <div
                                    className="display-4 fs-1 mb-2 font-weight-normal text-sans-serif">Серийный номер: {attributes.serial}
                                </div>
                                <div className="display-2 fs-1 mb-2 font-weight-normal text-sans-serif">SIM: <a
                                    className="text-primary" href={'tel:' + attributes.sim}>{attributes.sim}</a></div>
                                <Link to={'/helmet/' + this.state.serial + '/history'}
                                    className="btn btn-lg btn-falcon-default rounded-capsule float-right mt-3 mr-1 mb-1"
                                    type="button">
                                    <span className="fas fa-align-left mr-1" data-fa-transform="shrink-3"></span>История
                                </Link>

                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 card mb-3 overflow-hidden">
                            <div className="card-body position-relative">
                                <h4 className="row text-left mb-2 ml-0 mr-0">Дата и время: <span className="text-primary ml-1">{date.select ? dateWithTZ(date.select, tz !== undefined && tz.condition !== null && tz.condition !== undefined ? tz.condition : null) : 'Текущее время'}</span></h4>
                                <h6 className="row text-left mb-2 ml-0 mr-0">часовой пояс: <span className="text-primary ml-1">{tz !== undefined && tz.condition !== null && tz.condition !== undefined ? `${tz.condition.olsonName} ${moment().utcOffset(tz.condition.offsetMinutes).format('Z')}` : 'не определен'}</span></h6>
                                <form>
                                    <div className="form-row px-0 mx-0 mt-3">
                                        <div className="col-md-5 px-0">
                                            <Flatpickr
                                                data-enable-time
                                                value={date.value}
                                                options={{ dateFormat: "d/m/y H:i", enableTime: true }}
                                                onChange={(dates, dateStr, instance) => this.datePicker(dates, dateStr, instance)}
                                                className="form-control datetimepicker w-100"
                                                id="datetimepicker"
                                            />
                                        </div>
                                        <div className="col-md-3 px-0 ml-3 mr-2">
                                            <button onClick={() => this.getHelmetDate()} className="form-control btn btn-falcon-default btn-sm px-1 w-100" type="button">
                                                Узнать
                                            </button>
                                        </div>
                                        <div className="col-md-3 px-0">
                                            <button
                                                onClick={() => this.getNowHelmetDate()}
                                                disabled={(date.select) ? false : true} className="form-control btn btn-falcon-default btn-sm px-1 w-100" type="button">
                                                Текущее время
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="card-deck h-100 mb-3">

                        <div className="col-md-6 col-sm-12 card p-0" style={{ height: 'inherit' }}>
                            <div className="card-header bg-transparent row mt-2">
                                <div className="col-6">
                                    {dateWithTZ(condition.to, tz !== undefined && tz.condition !== null && tz.condition !== undefined ? tz.condition : null)}
                                </div>
                                <div className="col-6 text-right">
                                    <div className="d-inline-block mr-2">
                                        <span className={(charge === null || _.isEmpty(charge))
                                            ? "f-0 mb-1 badge badge-soft-primary d-none"
                                            : (charge !== null && !_.isEmpty(charge) && charge.timeToLive > 0)
                                                ? "f-0 mb-1 badge badge-soft-primary"
                                                : "f-0 mb-1 badge badge-soft-primary d-none"}>
                                            Заряд {charge !== null && !_.isEmpty(charge) && charge.timeToLive > 3600 ? 'около ' : 'менее '}
                                            {(charge !== null && !_.isEmpty(charge) && charge.timeToLive > 0)
                                                ? getRoundToHour(charge.timeToLive)
                                                : 0}
                                        </span>
                                    </div>

                                    <div className="d-inline-block">
                                        <span className={(charge && charge.percent && charge.percent !== null) ? "f-0 mb-1 badge " : "f-0 mb-1 badge d-none"} style={{ color: chargeColor }}>{(charge && charge.percent)}%</span>
                                    </div>

                                    <div className="d-inline-block">

                                        <svg width="40" height="20" viewBox="0 0 640 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M544 64V128H576V192H544V256H64V64H544ZM560 0H48C21.49 0 0 21.49 0 48V272C0 298.51 21.49 320 48 320H560C586.51 320 608 298.51 608 272V256H616C629.255 256 640 245.255 640 232V88C640 74.745 629.255 64 616 64H608V48C608 21.49 586.51 0 560 0ZM512 96H96V224H512V96Z" fill={chargeColor} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    {(on.condition !== null) ?
                                        <React.Fragment>
                                            {(on.condition === 'Yes') ?
                                                <div className="display-4 font-weight-normal text-success">
                                                    Надета
                                                </div>
                                                :
                                                (on.condition === 'Unknown')
                                                    ?
                                                    <div className="display-4 font-weight-normal text-danger">
                                                        Неизвестно
                                                    </div>
                                                    :
                                                    <div className="display-4 font-weight-normal text-warning">
                                                        Снята
                                                    </div>
                                            }
                                        </React.Fragment>
                                        : <div className="display-4 font-weight-normal text-danger">
                                            Нет данных
                                        </div>
                                    }
                                    {(on.condition !== null) ?
                                        <React.Fragment>
                                            {(on.condition !== null) ?
                                                <React.Fragment>
                                                    <div className="f-3 mt-3">
                                                        Ориентация:
                                                    </div>
                                                    <div className="display-4 font-weight-normal text-warning">
                                                        Неизвестно
                                                    </div>
                                                </React.Fragment> :
                                                <React.Fragment>
                                                    <div className="f-3 mt-3">
                                                        Ориентация:
                                                    </div>
                                                    <div className="display-4 font-weight-normal text-warning">
                                                        Неизвестно
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                        : <div className="mt-3 display-4 font-weight-normal text-danger">
                                            Неизвестно
                                        </div>
                                    }
                                    {(motion !== null && !_.isEmpty(motion)) ?
                                        <React.Fragment>
                                            {(motion.condition !== null)
                                                ? <React.Fragment>
                                                    <div className="f-3 mt-2">
                                                        Движение:
                                                    </div>
                                                    <div className={motion.condition === 'Motion' ? "mt-1 display-4 font-weight-normal text-success" : "mt-1 display-4 font-weight-normal text-warning"}>
                                                        {motion.condition === 'Motion' ? 'В движении' : motion.condition === 'Still' ? 'Неподвижна' : 'Неизвестно'}
                                                    </div>
                                                </React.Fragment>
                                                : <React.Fragment>
                                                    <div className="f-3 mt-2">
                                                        Движение:
                                                    </div>
                                                    <div className="mt-1 display-4 font-weight-normal text-warning">
                                                        Неизвестно
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                        : <div className="mt-2 display-4 font-weight-normal text-danger">
                                            Неизвестно
                                        </div>
                                    }
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    {(on.condition !== null) ?
                                        <React.Fragment>
                                            {(on.condition === 'Yes') ?
                                                <img src={on_unknown_unknown} style={{ width: '100%', margin: '15% 0' }} alt="" />
                                                :
                                                (on.condition === 'Unknown')
                                                    ?
                                                    <img src={unknown_unknown_unknown} style={{ width: '100%', margin: '15% 0' }} alt="" />
                                                    :
                                                    <img src={off_unknown_unknown} style={{ width: '100%', margin: '15% 0' }} alt="" />
                                            }
                                        </React.Fragment>
                                        : <div className="display-4 font-weight-normal text-danger">
                                            Нет данных
                                        </div>
                                    }
                                </div>

                                <hr className="border-bottom w-100 mt-4" />
                                <div className="col-12 mb-3">
                                    <h5 className="mt-3">Состояние:
                                        {(online.condition !== "Unknown") ?
                                            <React.Fragment>
                                                {(online.noDataDuration > online.alarmNoDataDuration) ?
                                                    <div className="d-inline text-danger"> Оффлайн <span className="badge badge-danger" style={{ fontSize: '10px', verticalAlign: 'middle' }}>
                                                        {timeConverter(online.noDataDuration).time} назад
                                                        </span>
                                                    </div>
                                                    :
                                                    <div className="d-inline text-success"> Онлайн <span className="badge badge-success" style={{ fontSize: '10px', verticalAlign: 'middle' }}>
                                                        {timeConverter(online.noDataDuration).time} назад
                                                        </span>
                                                    </div>
                                                }
                                            </React.Fragment>

                                            : <div className="d-inline text-danger"> Нет информации</div>
                                        }

                                    </h5>
                                    <h5 className="">Режим работы:
                                        <div className="d-inline"> {
                                            (condition.condition.condition === 'Charging') ? 'Заряжается' :
                                                (condition.condition.condition === 'Active') ? 'Рабочий' :
                                                    (condition.condition.condition === 'LowCharge') ? 'Низкая зарядка' :
                                                        'Не известно'
                                        }</div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 card p-0">
                            {gpsPoint[0] == 0 && gpsPoint[1] == 0 ? <div className="text-center card-body"><h4>Нет геоданных</h4></div> :
                                <div className="overflow-hidden h-100" id="map-container">
                                    <MapContainer center={gpsPoint} zoom={13} scrollWheelZoom={false} style={{ height: '390px' }}>
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <this.CenterComponent center={gpsPoint} />
                                        <Marker position={gpsPoint}>
                                        </Marker>
                                    </MapContainer>
                                </div>}
                        </div>
                    </div>

                    <div className="card-deck h-100 mb-sm-5">
                        <div className="col-12 card">
                            <div className="card-body row" style={{ overflow: 'hidden' }}>
                                <table className="custom-card-table fs-1">
                                    <thead>
                                        <tr className="fs-1">
                                            <th style={{ paddingRight: '50px' }}>Датчик</th>
                                            <th className="text-center">Значение</th>
                                            <th className="text-center">Время наступления события</th>
                                            <th className="text-center">Время доставки события</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <HelmetSensor hasData={tz.condition !== null}
                                            sensorData={tz}
                                            displayName="Часовой пояс"
                                            displayValue={() => `${tz.condition.olsonName} ${moment().utcOffset(tz.condition.offsetMinutes).format('Z')}`}>
                                        </HelmetSensor>
                                        {(gps.condition !== null) ?
                                            <tr>
                                                <td>GPS/Glonass</td>
                                                <td className="text-center">
                                                    {(gps.noDataDuration > gps.alarmNoDataDuration) ?
                                                        <React.Fragment>
                                                            <span className="text-danger">Нет сигнала</span> <br />
                                                        </React.Fragment>
                                                        :
                                                        <React.Fragment>
                                                            <span className="text-success">Есть сигнал</span> <br />
                                                        </React.Fragment>
                                                    }

                                                Широта: {gps.condition.point[0] ? gps.condition.point[0] : '—'} <br />
                                                Долгота: {gps.condition.point[1] ? gps.condition.point[1] : '—'} <br />
                                                Скорость: {gps.condition.speed ? gps.condition.speed : '—'} <br />
                                                Курс: {gps.condition.course ? gps.condition.course : '—'} <br />
                                                Спутников: {gps.condition.sats ? gps.condition.sats : '—'} <br />
                                                </td>
                                                <td className="text-center">{moment(gps.eventTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
                                                <td className="text-center">{moment(gps.receivedTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
                                            </tr>
                                            : <tr><td>GPS/Glonass</td><td className="text-center">нет данных</td><td></td><td></td></tr>
                                        }
                                        <HelmetSensor hasData={pressure.condition !== null}
                                            sensorData={pressure}
                                            displayName="Давление"
                                            displayValue={() => { return parseFloat((pressure.condition / 100).toFixed(2)) }}>
                                        </HelmetSensor>
                                        <HelmetSensor hasData={blueTooth.condition !== null}
                                            sensorData={blueTooth}
                                            displayName="BlueTooth"
                                            displayValue={() => { return blueTooth.condition.rssi }}>
                                        </HelmetSensor>
                                        <HelmetSensor hasData={distance.condition !== null}
                                            sensorData={distance}
                                            displayName="Датчик расстояния"
                                            displayValue={() => { return distance.condition }}>
                                        </HelmetSensor>
                                        <HelmetSensor hasData={this.state.condition.charge !== null && this.state.condition.charge.condition !== null}
                                            sensorData={this.state.condition.charge}
                                            displayName="Заряд батареи"
                                            displayValue={() => { return this.state.condition.charge.condition.percent }}>
                                        </HelmetSensor>
                                        <HelmetSensor hasData={temperature.condition !== null}
                                            sensorData={temperature}
                                            displayName="Температура"
                                            displayValue={() => { return parseFloat((temperature.condition / 100 - 273.15).toFixed(1)) }}>
                                        </HelmetSensor>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}

const HelmetSensor = ({ hasData, sensorData, displayName, displayValue }) => {
    return hasData ?
        <tr>
            <td>{displayName}</td>
            <td className="text-center">
                {(sensorData.noDataDuration > sensorData.alarmNoDataDuration) ?
                    <React.Fragment>
                        <span className="text-danger">Нет сигнала</span> <br />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <span className="text-success">{displayValue()}</span> <br />
                    </React.Fragment>
                }
            </td>
            <td className="text-center">{moment(sensorData.eventTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
            <td className="text-center">{moment(sensorData.receivedTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
        </tr>
        : <tr><td>{displayName}</td><td className="text-center">нет данных</td><td></td><td></td></tr>

};

export default Helmet;

