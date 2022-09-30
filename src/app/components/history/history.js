import React, { Component, Fragment } from "react";
import { leaflet } from '../../common/mapHelper'
import { dataTables } from '../../common/dataTables'
import { dateOneDayAgo, dateOneHourAgo, dateInMoscow, dateToTime, dateInUTC, dateWithTZ } from '../../common/dateHelper'
import _ from "lodash"
import Loader from "../loader/loader";
import ReactApexChart from "react-apexcharts";
import moment from 'moment-timezone';
import Flatpickr from "react-flatpickr";
import { deleteElement } from "../../common/elementHelper";
import marker from '../../../assets/img/diwo/marker-icon.png';
import {showIncident} from '../../common/incidentsHelper';


class History extends Component {


    currentDate = moment();
    state = {
        attributes: undefined,
        timelines: {},
        events: {},
        tracks: {},
        tz: undefined,
        error: { errorHistory: undefined, errorEvents: undefined, errorTracks: undefined },
        counter: 0,
        stepMinutes: 0,
        date: {
            valueFrom: moment(Date.UTC(this.currentDate.year(), this.currentDate.month(), this.currentDate.date())).utc().format(),
            valueTo: moment(Date.UTC(this.currentDate.year(), this.currentDate.month(), this.currentDate.date())).add(1, 'days').utc().format(),
            request: {
                from: new Date(),
                to: new Date(),
            },
            select: undefined,
        },
        company: undefined,
        donut: [
            {
                series: [44, 55, 41,],
                options: {
                    legend: {
                        // fontSize: '18px'
                    },
                    labels: ['Надета', 'Снята', 'Неизвестно'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom',
                            }
                        }
                    }]
                },
            },
            {
                series: [44, 55, 41],
                options: {
                    labels: ['Онлйан', 'Оффлайн', 'Неизвестно'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            },
            {
                series: [44, 55, 41],
                options: {
                    labels: ['Зарядка', 'Рабочий', 'Неизвестно'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            },
            {
                series: [44, 55, 41, 17, 15],
                options: {
                    labels: ['Горизонтальна', 'На левом боку', 'На правом боку', 'Наклон вперед', 'Неизвестно'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            }
        ],

        series: [],
        map: null,
        options: {
            chart: {
                animations: {
                    enabled: false,
                    speed: 1,
                },
                height: 350,
                type: 'rangeBar',
                events: {
                    click: function (event, chartContext, config) {
                        if (config.seriesIndex !== -1) {
                            console.log(chartContext, config, dateInMoscow(Number(config.config.series[config.seriesIndex].data[0].y[0]), 'display'));
                            alert(config.config.series[config.seriesIndex].name + ' Date: ' + dateInMoscow(Number(config.config.series[config.seriesIndex].data[0].y[0]), 'display') + '---' + dateInMoscow(Number(config.config.series[config.seriesIndex].data[0].y[1]), 'display'))
                        }
                    }
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '50%',
                    rangeBarGroupRows: true
                }
            },
            colors: ['red'],
            fill: {
                type: 'solid'
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false,
                },

            },
            legend: {
                show: false
            },
            tooltip: {
                custom: function (opts) {
                    if (opts.seriesIndex !== -1) {
                        const desc = opts.ctx.w.config.series[opts.seriesIndex].name
                        return desc + ': ' + moment(opts.y1).format('HH:mm') + ' - ' + moment(opts.y2).format('HH:mm')
                    }
                }
            }
        },

    }

    componentDidMount() {
        let { date } = this.state;
        let location = this.props.history.location.search;
        let dateRequest = {};
        let position_To = location.search('To');
        let position_From = location.search('From');
        

        dateRequest.to = (this.hasUrlDate()) ? location.slice(position_To + 3, location.length) : date.valueTo;
       

        dateRequest.from = (this.hasUrlDate()) ? location.slice(position_From + 5, position_To - 1) : date.valueFrom;
        

        date.valueFrom = dateRequest.from;
        date.valueTo = dateRequest.to;

        this.setState({
            date
        });

        
        dataTables()
        this.getHistoryHelmet(date.valueFrom, date.valueTo, !this.hasUrlDate());

    }

    hasUrlDate() {
        return this.props.history.location.search !== '';
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        let { events, timelines, attributes, error, tracks, stepMinutes, tz } = this.props;
        let { series, counter, options } = this.state;
        if (attributes !== prevProps.attributes && timelines) {
            this.setState({
                timelines,
                attributes,
                events,
                error,
                tracks,
                stepMinutes,
                tz,
            })
        }


        if (!_.isEmpty(this.props.company) && this.state.company === undefined) {
            for (let key in this.props.company) {
                this.setState({
                    company: this.props.company.name
                })
            }
        }

        if (!_.isEmpty(tracks) && this.state.tracks !== prevState.tracks && counter === 0 ) {
            let tracksArr = [];

            tracks.features.map((track, index) => {
                tracksArr.push(track)
            })

            events.data.map((event, index) => {
                event.active = false;
            })

            let map = new leaflet('history', tracksArr, events, 'osm');

            this.setState({
                map, events
            })

            map.renderHistory()
        }

        if (!this.props.loading && this.state.date.request !== prevState.date.request && !_.isEmpty(tracks)) {
            deleteElement("helmet-map", "map-container", "div", "helmet-map", "height: 415px", "", "mount")
        }

        
        if (!this.state.loading && this.props.timelines !== prevProps.timelines && (this.props.from !== this.state.date.valueFrom || this.props.to !== this.state.date.valueTo)) {
            let date = { ...this.state.date };
            date.valueFrom = moment(this.props.from).utc().format();
            date.valueTo = moment(this.props.to).utc().format();
            this.setState({
                date
            })
            if(this.hasUrlDate()) {
                this.props.history.push(`?From=${date.valueFrom}&To=${date.valueTo}`)
            }
        }

        if (!_.isEmpty(timelines) && this.state.timelines !== prevState.timelines && counter === 0) {
            let colorsItems = [];
            series = [];
            let stepMinutes = this.state.stepMinutes

            timelines.map((item, index) => {
                let objOn = {};
                let objMotion = {};
                let objActive = {};
                let objOnline = {};
                let objCondition = {};

                objOn.data = [];
                objMotion.data = [];
                objActive.data = [];
                objOnline.data = [];
                objCondition.data = [];

                if (index === 0) {
                    index = index++;
                }
                // Надета
                if (item.on === 'Yes') {
                    objOn.name = 'Надета'
                    colorsItems.push('#309c00')
                    objOn.data.push({
                        x: 'Надета',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.on === 'Unknown') {
                    objOn.name = 'Не известно'
                    colorsItems.push('#9e9e9e')
                    objOn.data.push({
                        x: 'Надета',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else {
                    objOn.name = 'Снята'
                    colorsItems.push('#ff3d00')
                    objOn.data.push({
                        x: 'Надета',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                }
                // Движение
                if (item.motion === 'Motion') {
                    objMotion.name = 'В движении'
                    colorsItems.push('#309c00')
                    objMotion.data.push({
                        x: 'Движение',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.motion === 'Still') {
                    objMotion.name = 'Неподвижна'
                    colorsItems.push('#ff3d00')
                    objMotion.data.push({
                        x: 'Движение',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else {
                    objMotion.name = 'Не известно'
                    colorsItems.push('#9e9e9e')
                    objMotion.data.push({
                        x: 'Движение',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                }
                // Активность
                if (item.active === 'Yes') {
                    objActive.name = 'Надета и в движении'
                    colorsItems.push('#309c00')
                    objActive.data.push({
                        x: 'Активность',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.active === 'No') {
                    objActive.name = 'Не надета и не в движении'
                    colorsItems.push('#ff3d00')
                    objActive.data.push({
                        x: 'Активность',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else {
                    objActive.name = 'Unknown'
                    colorsItems.push('#9e9e9e')
                    objActive.data.push({
                        x: 'Активность',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                }
                // Онлайн
                if (item.online === 'Online') {
                    objOnline.name = 'Онлайн'
                    colorsItems.push('#309c00')
                    objOnline.data.push({
                        x: 'Онлайн',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.online === 'Unknown') {
                    objOnline.name = 'Не известно'
                    colorsItems.push('#9e9e9e')
                    objOnline.data.push({
                        x: 'Онлайн',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else {
                    objOnline.name = 'Оффлайн'
                    colorsItems.push('#ff3d00')
                    objOnline.data.push({
                        x: 'Онлайн',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                }
                // Режим работы
                if (item.condition === 'Active') {
                    objCondition.name = 'Рабочий'
                    colorsItems.push('#309c00')
                    objCondition.data.push({
                        x: 'Режим работы',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.condition === 'LowCharge') {
                    objCondition.name = 'Низкая зарядка'
                    colorsItems.push('#e24700')
                    objCondition.data.push({
                        x: 'Режим работы',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.condition === 10) {
                    objCondition.name = 'Режим энергосбережния'
                    colorsItems.push('#00acff')
                    objCondition.data.push({
                        x: 'Режим работы',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.condition === 'Charging') {
                    objCondition.name = 'Зарядка'
                    colorsItems.push('#ffaf58')
                    objCondition.data.push({
                        x: 'Режим работы',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                } else if (item.condition === 'Unknown') {
                    objCondition.name = 'Не известно'
                    colorsItems.push('#9e9e9e')
                    objCondition.data.push({
                        x: 'Режим работы',
                        y: [
                            moment(this.props.from).tz("Europe/Moscow").add(index * stepMinutes, 'minutes').format('x'),
                            moment(this.props.from).tz("Europe/Moscow").add((index + 1) * stepMinutes, 'minutes').format('x'),
                        ]
                    })
                }

                series.push(objOn, objMotion, objActive, objOnline, objCondition);
                options.colors = [...colorsItems]
            })

            this.setState({
                series, options,
                counter: counter + 1,
            })
        }

        if(this.props.tz !== prevProps.tz) {
            this.setState({tz: this.props.tz});
        }

        

        if (this.props.timelines !== prevProps.timelines) {
            this.setState({
                counter: 0
            })
        }
    }

    componentWillUnmount() {
        let { tracks } = this.state;
        this.props.cleanHistory();

        if (!_.isEmpty(tracks)) {
            deleteElement("helmet-map", "map-container", "div", "helmet-map", "height: 415px", "unmount")
        }
    }

    datePickerChanged = (dates) => {
        let date = { ...this.state.date };

        date.valueFrom = dateInUTC(dates[0]);
        let from = moment(dates[0]);
        let to = from.clone().add(1, 'days').add(-1, 'seconds').utc().format();

        from = from.utc().format();
        date.valueFrom = from;
        date.valueTo = to;
        
        this.props.history.push(`?From=${from}&To=${to}`)

        this.setState({
            date
        });
        this.getHistoryHelmet(from, to, true);
    }

    getHistoryHelmet = (from, to, getTz) => {
        this.props.getHistoryHelmet(this.props.match.params.id, from, to, getTz);
    }

    clickEvent = (eventTrack) => {
        let { events } = this.state;

        events.data.map((event, index) => {

            event.active = event.point === eventTrack.point;
        })

        this.setState({
            events
        })

        this.state.map.clickEvent({ lat: eventTrack.point[0], lng: eventTrack.point[1] })
    }

    clickMarker = () => {
        let marker = this.state.map.marker()

        let { events } = this.state;

        events.data.map((event, index) => {
            event.active = false;
            if (event.point !== null && event.point[0] === marker.lat && event.point[1] === marker.lng) {
                event.active = true;
            }
        })

        this.setState({
            events
        })
    }

    render() {

        let { attributes, tracks, timelines, events, error, date, stepMinutes, company, tz } = this.state;
        if (!this.props.loading && !_.isEmpty(attributes)) {
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

                    <div className="row no-gutters">
                        <div className="col-lg-6 pr-lg-2 col-md-12 mb-2">
                            <div className="card h-100">
                                <div className="card-body d-inline-block align-middle form-group">
                                    <div className="list-group-flush mt-1">
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-0 font-weight-semi-bold border-top-0">
                                            <p className="mb-0">Каска</p>
                                            <p className="mb-0"></p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <p className="mb-0">Название</p>
                                            <p className="mb-0 text-dark text-right">{attributes.name}</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <p className="mb-0">Компания</p>
                                            <p className="mb-0 text-dark">{company}</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <p className="mb-0">Серийный номер</p>
                                            <p className="mb-0 text-dark text-right">{attributes.serial}</p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <p className="mb-0">SIM</p>
                                            <p className="mb-0 text-dark"><a href={'tel:' + attributes.sim}>{attributes.sim}</a></p>
                                        </div>
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1"
                                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <p className="mb-0">Часовой пояс</p>
                                            <p className="mb-0 text-dark text-right">{tz !== undefined && tz.condition !== null && tz.condition !== undefined ? `${tz.condition.olsonName} ${moment().utcOffset(tz.condition.offsetMinutes).format('Z')}` : 'не определен'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/*<hr className="m-0"/>*/}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 mb-2">
                            <div className="card h-100">
                            <div className="card-body d-inline-block align-middle form-group">
                                    <div className="list-group-flush mt-1">
                                        <div
                                            className="list-group-item bg-transparent d-flex justify-content-between px-0 py-0 font-weight-semi-bold border-top-0">
                                            <p className="mb-0">Дата</p>
                                            <p className="mb-0"></p>
                                        </div>
                                        <div/>
                                    </div>
                                   
                                    
                                    <Flatpickr
                                        ref={fp => { this.fp = fp; }}
                                        value={moment(date.valueFrom).format("DD.MM.YYYY")}
                                        options={{ dateFormat: "d.m.Y", enableTime: false }}

                                        onChange={(dates, dateStr, instance) => this.datePickerChanged(dates)}

                                        className="form-control datetimepicker mt-5"
                                        id="datetimepickerFrom"
                                    >
                                        
                                    </Flatpickr>
                                    <button onClick={() => { if (this.fp){ setTimeout(() => this.fp.flatpickr.open(), 0); }}} className="mt-3 btn btn-falcon-default btn-sm mb-1">Выбрать дату</button> 

                            </div>
                                
                            </div>
                        </div>

                    </div>

                    <div className="row no-gutters">
                        <div className="col-lg-12 mb-3">
                            <div className="card">

                                <div className="card-body d-flex align-items-center">
                                    <div className="w-100">
                                        {(this.state.counter === 1 && timelines && stepMinutes !== 0)
                                            ?
                                            <div id="chart">
                                                <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350} /> 
                                            </div>
                                            : 'Нет данных'
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters d-none"> {/*TODO fill diagrams*/}
                        <div
                            className="col-12 mb-3">
                            <div className="card h-md-100">
                                <div className="card-body">
                                    <h6 className="mt-1 mb-3">Суммарная информация</h6>
                                    <div className="row h-100 justify-content-between no-gutters">

                                        {this.state.donut.map((item, i) => {
                                            return (
                                                <div key={Math.random()} className="col-md-6 col-sm-12">
                                                    <div className="donut d-inline-block">
                                                        <ReactApexChart options={item.options} series={item.series} type="pie" width="380" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {/*<div className="col-auto">*/}
                                        {/*    <div className="echart-doughnut"></div>*/}
                                        {/*    <div className="absolute-centered font-weight-medium text-dark fs-2">26M*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-lg-12 col-md-12 mb-3">

                            <div className="card overflow-hidden" onClick={() => this.clickMarker()} id="map-container">
                                {(tracks) ? <div id="helmet-map" style={{ height: '415px' }}></div>
                                    : <div className="p-3">Нет данных для карты</div>
                                }
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
                                        <table className="table table-hover table-sm table-dashboard fs--1 data-table border-bottom"
                                            data-options='{"responsive":false,"pagingType":"simple","lengthChange":false,"searching":false,"pageLength":20,"columnDefs":[{"orderable":false}],"language":{"info":"с _START_ по _END_ из доступных _TOTAL_"},"buttons":["copy","excel"]}'>
                                            <thead className="bg-200 text-900">
                                                <tr>
                                                    <th className="sort pr-1 align-middle">Дата и время события</th>
                                                    <th className="sort pr-1 align-middle">Описание события</th>
                                                </tr>
                                            </thead>
                                            <tbody id="purchases">

                                                {(!_.isEmpty(events.data)) ?
                                                    <React.Fragment>
                                                        {this.state.events.data.map((event, index) => {

                                                            return (
                                                                <tr className={['btn-reveal-trigger cursor-pointer', (event.active) ? 'bg-300' : ''].join(" ")} onClick={(event.point) ? () => {
                                                                    this.clickEvent(event)
                                                                } : null} key={`${index}-${Math.random()}`}>
                                                                    <td className="align-middle">{(event.point !== null) ?
                                                                        <img src={marker} alt="" style={{ maxHeight: '15px', marginRight: '5px' }} /> : null}{dateWithTZ(event.eventTime, tz !== undefined && tz.condition !== null && tz.condition !== undefined ? tz.condition : null)}
                                                                    </td>
                                                                    <td className="align-middle">{showIncident(event)} </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </React.Fragment>
                                                    : <tr><td>Нет данных</td><td></td></tr>
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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

export default History;
