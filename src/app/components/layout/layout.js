import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import BreadCrumb from "../breadcrumb/breadcrumb";
import { Link } from "react-router-dom";
import Sidepanel from '../sidepanel/sidepanel';
import { date30MinutesAfter, date30MinutesAgo, dateInUTC, dateOneDayAgo } from "../../common/dateHelper";
import { saveDataStorage, getDataStorage } from '../../common/localStorageHelper';
import { showIncident } from '../../common/incidentsHelper';
import { countDown } from '../../common/dateHelper';
import moment from 'moment-timezone';

export default class Layout extends Component {
    state = {
        incident: {},
        oldestReceiptTime: dateOneDayAgo(),
        errorList: undefined,
        errorIncident: undefined,
        loading: true,
        arrayIncidents: [],
        listIncidents: {
            data: []
        },
        toggleAutoShow: getDataStorage('toggleState') !== null ? (getDataStorage('toggleState') === 'true') : true,
        timePassed: [],
        flag: false,
    }
    componentDidMount() {
        this.props.getListIncidents(dateInUTC(new Date()), 100);
        this.props.getNowIncidents();
        this.timer = setInterval(() => this.tick(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { listIncidents, incident, errorIncident, errorList, loading, arrayIncidents, oldestReceiptTime } = this.state;

        if ((this.props.listIncidents !== prevProps.listIncidents) && !this.state.flag) {
            
            oldestReceiptTime = this.props.oldestReceiptTime;
            errorList = this.props.errorList;
            loading = this.props.loading;

            if (!_.isEmpty(this.props.listIncidents)) {
                this.props.listIncidents.data.slice(0, 10).map((incident, index) => {
                    incident.active = false;
                    listIncidents.data.push(incident);
                })
                this.setState({flag: !this.state.flag});
            }

            this.setState({
                listIncidents, errorList, loading, oldestReceiptTime, timePassed: countDown(listIncidents.data), 
            })
        }

        if (this.props.polling) {
            this.props.getNowIncidents()
        }

        if (this.props.incident !== prevProps.incident) {
            incident = this.props.incident;
            errorIncident = this.props.errorIncident;
            arrayIncidents = [];

            if (!errorIncident && incident && !_.isEmpty(incident)) {
                incident.data.map((item) => {
                    item.active = true;
                    arrayIncidents.unshift(item);
                    listIncidents.data.unshift(item);
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

            if (this.state.toggleAutoShow && !_.isEmpty(this.state.incident)) {
                $('#sidepanelModal').modal('show');
            }

            this.setState({
                incident, errorIncident, arrayIncidents
            });
        }
    }

    showHide = () => {
        saveDataStorage('toggleState', !this.state.toggleAutoShow);
        this.setState({ toggleAutoShow: !this.state.toggleAutoShow });
    }

    tick = () => {
        this.setState({timePassed: countDown(this.state.listIncidents.data)});
    }

    render() {
        const { listIncidents, incident } = this.state;
        return (
            <main className="main" id="top">
                <div className="container" data-layout="container">
                    <Header history={this.props.history} logout={this.props.logout} />
                    <Sidepanel>
                        <div className="modal-header pt-3 fixed-top bg-primary">
                            <h5 className="modal-title z-index-1 text-white ml-3" id="sidepanelModalLabel">Происшествия</h5>
                            <button className="close z-index-1 text-white" type="button" data-dismiss="modal" aria-label="Close"><span className="font-weight-light" aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body px-card mt-5 mb-5">
                            {listIncidents ? listIncidents.data.map((item, index) => {
                                return (
                                    // <div className={['btn-reveal-trigger', (item.active) ? 'bg-alert': ''].join(" ")}>
                                    <div className="btn-reveal-trigger"
                                        style={(item.active) ? { background: 'rgba(217, 83, 79, .5)' } : {}}>
                                        <span className="font-weight-bold"> Устройство: {item.serial}</span>
                                        <p key={`${index}-${Math.random()}`} className="mb-0">Событие:
                                            <Link to={'/helmet/' + item.serial + '/history?From=' + date30MinutesAgo(item.eventTime) + '&To=' + date30MinutesAfter(item.eventTime)} >
                                                {showIncident(item)}
                                            </Link>
                                        </p>
                                        <span> Время: {moment(item.eventTime).format('YYYY.MM.DD HH:mm:ss Z')}</span><br />
                                        <span> Прошло: {this.state.timePassed[index]}</span><br />
                                        <br />
                                    </div>
                                )
                            }) : null}
                        </div>
                        <div className="modal-footer pt-3 fixed-bottom bg-light d-flex justify-content-start border-top border-primary">
                            <div className="custom-control custom-switch pl-5">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1" onClick={this.showHide} defaultChecked={this.state.toggleAutoShow} />
                                <label className="custom-control-label text-dark h6" htmlFor="customSwitch1">Показывать автоматически</label>
                            </div>
                        </div>
                    </Sidepanel>
                    <BreadCrumb />
                    {this.props.children}
                </div>
                <Footer />
            </main>
        );
    }
}
