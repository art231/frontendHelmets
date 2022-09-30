import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import { dataTables } from "../../common/dataTables";
import { geoLeaflet } from '../../common/mapHelper';
import _ from "lodash";
import main from '../../../scss/style.scss';
import Geozone from '../../container/geozone';
import Loader from "../loader/loader";
import { relativeTimeThreshold } from "moment-timezone";
import DropdownCompanies from '../reports/dropdownCompanies';

class Geozones extends Component {

    state = {
        company: null,
        listGeozones: [],
        error: undefined,
        loading: true,
        gpsPoint: undefined,
        creating: false,
        form: {
            name: ''
        },
        map: undefined,
    }

    componentDidMount() {
        this.props.getCompanies();
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loadingCompanies !== prevProps.loadingCompanies ||
            this.props.listGeozones !== prevProps.listGeozones && this.props.listGeozones ||
            this.props.error !== prevProps.error ||
            this.props.loading !== prevProps.loading) {
            this.setState({
                loadingCompanies: this.props.loadingCompanies,
                error: this.props.error,
                loading: this.props.loading,
            })
        }

        if (this.state.map !== undefined && this.props.listGeozones && this.props.listGeozones.data !== prevProps.listGeozones.data) {
            var data = (this.props.listGeozones) ? this.props.listGeozones.data : []
            this.setState({
                listGeozones: data,
            });
            this.state.map.renderGeozones(data);
        }

        console.log("Map state", this.state)

         if (this.state.map === undefined && !this.state.loading && !this.state.loadingCompanies) {
            let gpsPoint = [0, 0];

            if (this.state.gpsPoint === undefined) {
                this.setState({
                    gpsPoint
                })
            }

            let map = new geoLeaflet('zones-map', this.state.gpsPoint, '', 'osm');

            var obj = this;
            map.setOnClickCallback(function (zone) {
                obj.onGeozoneSelected(zone);
            });



        
            this.setState({
                map
            });
        
         }



        if (this.props.errorCompanies !== prevProps.errorCompanies && this.props.errorCompanies === "ОК") {
                this.props.getCompanies();
        }


    }

    componentWillUnmount() {
        this.setState({
            map: null,
            gpsPoint: undefined,
        })
    }

    onSelectCompany = (company) => {
        this.refreshGeozonesList = this.props.getListGeozones;
        if(company) {
            this.refreshGeozonesList(company.id);
        }
        this.setState({ company });
    }

    onAddPressed() {
        this.onGeozoneSelected(null)
        this.state.map.setSelected(null);
        this.state.map.setEditable(true);
        this.setState({
            creating: true
        })
    }

    onGeozoneSelected(geozone) {
        this.state.map.setEditable(false);
        this.state.map.setSelected(geozone ? geozone.id : null);
        var zones = this.state.listGeozones;
        _.forEach(zones, (item) => {
            item.active = geozone && item.id == geozone.id;
        })
        this.setState({
            listGeozones: zones,
            creating: geozone ? false : true
        })
    }

    onZoneUpdate() {
        this.state.map.setEditable(false);
        this.setState({
            creating: false
        })
        this.props.getListGeozones(this.state.company.id);

    }

    onError(error) {
        this.setState({
            error: error,
        });
    }



    render() {

        let { listGeozones, error } = this.state;

        var selectedZone = _.find(listGeozones, (zone) => {
            return zone.active
        });
        var companyId = this.state.company ? this.state.company.id : undefined;
        if (!this.state.loadingCompanies || !this.state.loading) {
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
                        <div className="col-md-3 overflow-hidden" >
                            <div className="card row" style={{ minHeight: '550px' }}>
                                <div className="card-body position-relative">
                                    <h4 className="text-center mb-2">Компания</h4>
                                    <DropdownCompanies selectCompany={(company) => this.onSelectCompany(company)} />
                                    <h4 className="text-center mb-3 mt-3">Геозоны</h4>
                                    <div className="list-group" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                        {(!_.isEmpty(listGeozones)) ?
                                            listGeozones.map((item, index) => {
                                                return <a className={["list-group-item list-group-item-action", item.active ? "active" : ""].join(" ")} onClick={() => {
                                                    this.onGeozoneSelected(item);
                                                }} key={`${item.id}`}>{item.name}</a>
                                            }
                                            ) : null}
                                    </div>



                                </div>


                                {!this.state.creating && this.state.company ? <button onClick={() => { this.onAddPressed() }} className="mb-3 ml-3 mr-3 btn btn-falcon-default btn-sm" type="button">Добавить</button>
                                    : null}

                            </div>
                            <div style={{ height: '20px' }}></div>
                            {
                                this.state.creating ?
                                    <Geozone map={this.state.map} onError={(error) => { this.onError(error) }} onUpdate={() => { this.onZoneUpdate() }} data={{ id: undefined, name: '', companyId: companyId, deleted: false, created: false }} />
                                    : selectedZone ? <Geozone map={this.state.map} data={selectedZone} onError={(error) => { this.onError(error) }} onUpdate={() => { this.onZoneUpdate() }} /> : null}

                        </div>
                        <div className="col-md-9 col-sm-12 mb-3 overflow-hidden">

                            <div className="card overflow-hidden" id="map-container">
                                <div id="zones-map" style={{ height: '750px' }}></div>

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
export default Geozones;

