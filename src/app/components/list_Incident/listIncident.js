import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import { date30MinutesAfter, date30MinutesAgo, dateInUTC, dateOneDayAgo, countDown } from "../../common/dateHelper";
import { dataTables } from '../../common/dataTables'
import { deleteElement } from '../../common/elementHelper'
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";
import { showIncident } from '../../common/incidentsHelper';
import moment from 'moment-timezone';

class ListIncident extends Component {

    state = {
        errorList: undefined,
        errorIncident: undefined,
        loading: false,
        listIncidents: {
            data: [],
        },
        incidents: {},
        arrayIncidents: [],
        timePassed: [],
        oldestReceiptTime: dateOneDayAgo()
    }

    componentDidMount() {
        if (!_.isEmpty(this.props.listIncidents)) {
            this.setState({ listIncidents: this.props.listIncidents });
        }
        this.timer = setInterval(() => this.tick(), 5000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { listIncidents, incident, errorIncident, errorList, loading, arrayIncidents, oldestReceiptTime } = this.state;
        // console.log('counter', counter)
        // if($('#data-table-incident').length > 0 && counter > 1) {
        //     dataTables()
        // }

        // (async() => { if($('#data-table-incident').length > 0) {
        //     if(prevProps !== this.props) {
        //         await deleteElement('data-table-incident', 'falcon-data-table-incident', 'div', 'data-table-incident', '', 'table table-sm mb-0 table-striped table-dashboard fs--1 data-table border-bottom border-200', 'mount');
        //     }
        //     await dataTables()
        // }})()

        if (this.props.listIncidents !== prevProps.listIncidents) {

            // listIncidents.data.push(this.props.listIncidents.data)
            oldestReceiptTime = this.props.oldestReceiptTime
            errorList = this.props.errorList
            loading = this.props.loading


            if (!_.isEmpty(this.props.listIncidents)) {
                this.props.listIncidents.data.map((incident, index) => {
                    incident.active = false
                    listIncidents.data.push(incident)
                })
            }

            this.setState({
                listIncidents, errorList, loading, oldestReceiptTime, timePassed: countDown(listIncidents.data),
            })
        }

        // if (this.props.pooling) {
        //     this.props.getNowIncidents()
        // }

        if (this.props.incident !== prevProps.incident) {
            incident = this.props.incident
            errorIncident = this.props.errorIncident
            arrayIncidents = []

            if (!errorIncident && incident && !_.isEmpty(incident)) {
                incident.data.map((item) => {
                    arrayIncidents.unshift(item)
                    item.active = true
                    listIncidents.data.unshift(item)
                })

                setTimeout(() => {
                    listIncidents.data.map((item) => {
                        item.active = false
                    })
                    this.setState({
                        listIncidents
                    })
                }, 10000)
            }

            this.setState({
                incident, errorIncident, arrayIncidents
            })
        }
        // if(prevState.incident !== this.state.incident && !_.isEmpty(prevProps.incident)) {
        //     let modal = document.getElementsByClassName('modal-backdrop');
        //     if(modal.length === 0) {
        //         document.getElementById("triggerWarning").click();
        //     }
        // }
    }

    tick = () => {
        this.setState({timePassed: countDown(this.state.listIncidents.data)});
    }

    takeListIncident = () => {
        this.props.getListIncidents(dateInUTC(this.state.oldestReceiptTime), 100)
    }

    render() {
        let { listIncidents, incidents, errorIncident, errorList, loading, arrayIncidents } = this.state;

        if (!loading) {
            return (
                <div className="card mb-3">

                    {(errorIncident !== "ОК" && errorIncident || errorList !== "ОК" && errorList && errorList !== 'Нет данных') ?
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> {errorIncident || errorList}
                            <button className="close" type="button" data-dismiss="alert" aria-label="Close" onClick={() => this.closedAlert()}><span
                                className="font-weight-light" aria-hidden="true">×</span></button>
                            <div className="d-inline-block ml-2 cursor-pointer" onClick={() => location.reload()}>
                                <i className="fas fa-sync-alt"
                                    style={{ width: '1rem', height: '1rem', color: 'gray' }}></i>
                            </div>
                        </div>
                        : null
                    }

                    <div className="card-header">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-4 col-sm-auto d-flex align-items-center pr-0">
                                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Список касок, сообщивших о
                                    происшествии</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="falcon-data-table" id="falcon-data-table-incident">
                            {(!_.isString(this.state.error) && !_.isEmpty(listIncidents) && !_.isEmpty(listIncidents.data)) ?
                                <table
                                    id="data-table-incident"
                                    className="table table-sm mb-0 table-striped table-dashboard fs--1 data-table border-bottom border-200"
                                // data-options='{"searching":false,"responsive":false,"pageLength":3,"info":false,"lengthChange":false,"sWrapper":"falcon-data-table-wrapper","dom":"<&#39;row mx-1&#39;<&#39;col-sm-12 col-md-6&#39;l><&#39;col-sm-12 col-md-6&#39;f>><&#39;table-responsive&#39;tr><&#39;row no-gutters px-1 py-3 align-items-center justify-content-center&#39;<&#39;col-auto&#39;p>>","language":{"paginate":{"next":"<span class=\"fas fa-chevron-right\"></span>","previous":"<span class=\"fas fa-chevron-left\"></span>"}}}'
                                >
                                    <thead className="bg-200 text-900">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ minWidth: '150px' }}>Тип события</th>
                                            <th scope="col" className="text-center">Прошло времени</th>
                                            <th scope="col" className="text-center">Время события</th>
                                            <th scope="col" className="text-center">Время уведомления</th>
                                            <th scope="col" className="text-center" style={{ minWidth: '200px' }}>Серийный номер каски</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {(!_.isEmpty(listIncidents)) ? listIncidents.data.map((incident, index) => {
                                            return (
                                                <tr className={['btn-reveal-trigger text-center', (incident.active) ? 'bg-alert opacity-50' : ''].join(" ")} key={`${index}-${Math.random()}`}>
                                                    <td className="py-2 align-middle white-space-nowrap">
                                                        <Link to={'/helmet/' + incident.serial + '/history?From=' + date30MinutesAgo(incident.eventTime) + '&To=' + date30MinutesAfter(incident.eventTime)}>
                                                            {/* {incident.shock !== null && !_.isEmpty(incident.shock) ? showIncident(incident.type, incident.shock.thresholdNum) : showIncident(incident.type)} */}
                                                            {showIncident(incident)}
                                                        </Link>
                                                    </td>
                                                    <td scope="col" className="py-3 text-center">{this.state.timePassed[index]}</td>
                                                    <td scope="col" className="py-3 text-center">{moment(incident.eventTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
                                                    <td scope="col" className="py-3 text-center">{moment(incident.receiptTime).format('YYYY.MM.DD HH:mm:ss Z')}</td>
                                                    <td scope="col" className="py-3 text-center pr-3">{incident.serial}</td>
                                                </tr>
                                            )
                                        }) : null}

                                    </tbody>
                                </table>
                                : <div className={main.NotFound}>Нет данных</div>}
                        </div>
                    </div>

                    <div className="m-auto">
                        {(!_.isEmpty(this.props.listIncidents.data)) ?
                            <button id="loadNext"
                                to='/'
                                role="button"
                                className="btn btn-info d-block mt-2 mb-4"
                                onClick={() => this.takeListIncident()}
                            >
                                Показать больше
                            </button> : null}
                    </div>

                    <button id="triggerWarning"
                        to='/'
                        role="button"
                        data-toggle="modal"
                        data-target="#WarningModal"
                        style={{ color: 'green', display: 'none' }}
                    />
                    <div className="modal fade" id="WarningModal" tabIndex="-1" role="dialog"
                        aria-labelledby="WarningModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title m-auto text-danger" id="WarningModalLabel">ВНИМАНИЕ! ПРОИСШЕСТВИЯ СЕЙЧАС</h5>
                                    <button className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                                        data-dismiss="modal" aria-label="Close"><span className="font-weight-light"
                                            aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-center">

                                    {arrayIncidents.map((item, index) => {
                                        return (
                                            <p key={`${index}-${Math.random()}`}>Событие: <span className="font-weight-bold">{item.type}</span><br />
                                                Когда: <span className="font-weight-bold">{moment(item.eventTime).format('YYYY.MM.DD HH:mm:ss Z')}</span><br />
                                                Кто: <span className="font-weight-bold">{item.serial}</span><br />
                                            </p>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}
export default ListIncident;

