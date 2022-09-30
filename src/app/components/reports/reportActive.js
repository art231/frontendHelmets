import React, { Component } from "react";
import _ from "lodash";
import Loader from "../loader/loader";
import Calendar from "../calendar/calendar";
import moment from "moment-timezone";
import { getRangeToFrom } from "../../common/dateHelper";
import DropdownCompanies from "./dropdownCompanies";
import DropdownGeofences from "./dropdownGeofences";
import ReportMap from "./reportMap";
import ReportActiveTable from './reportActiveTable';
import Error from '../error/error';

class ReportActive extends Component {
  state = {
    company: null,
    geofence: {},
    listGeofences: [],
    errorGeofences: undefined,
    loadingGeofences: true,
    from: moment().subtract(7, "days"),
    to: moment().subtract(1, "days"),
    rangeFromTo: [],
    groupStatsItemsWithoutGeofence: [],
    groupStatsItemsWithGeofence: [],
    errorGroupStats: undefined,
    loadingGroupStats: false,
    requestGroupReport: false,
    oneCompanyFlag: false,
    gpsPoint: undefined,
    bounds: [],
    showExtra: false,
  };

  componentDidMount() {
    this.props.getCompanies();
    this.setState({
      rangeFromTo: getRangeToFrom(this.state.from, this.state.to),
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (this.props.listGeofences !== prevProps.listGeofences &&
        this.props.listGeofences) ||
      this.props.errorGeofences !== prevProps.errorGeofences ||
      this.props.loadingGeofences !== prevProps.loadingGeofences ||
      (this.props.groupStatsItemsWithoutGeofence !==
        prevProps.groupStatsItemsWithoutGeofence &&
        this.props.groupStatsItemsWithoutGeofence) ||
      (this.props.groupStatsItemsWithGeofence !==
        prevProps.groupStatsItemsWithGeofence &&
        this.props.groupStatsItemsWithGeofence) ||
      this.props.errorGroupStats !== prevProps.errorGroupStats ||
      this.props.loadingGroupStats !== prevProps.loadingGroupStats ||
      this.props.loadingCompanies !== prevProps.loadingCompanies
    ) {
      this.setState({
        errorGeofences: this.props.errorGeofences,
        loadingGeofences: this.props.loadingGeofences,
        errorGroupStats: this.props.errorGroupStats,
        loadingGeofences: this.props.loadingGeofences,
        groupStatsItemsWithoutGeofence: this.props
          .groupStatsItemsWithoutGeofence
          ? this.props.groupStatsItemsWithoutGeofence
          : [],
        groupStatsItemsWithGeofence: this.props.groupStatsItemsWithGeofence
          ? this.props.groupStatsItemsWithGeofence
          : [],
        loadingGroupStats: this.props.loadingGroupStats,
        loadingCompanies: this.props.loadingCompanies,
      });
    }
    if (
      this.props.errorCompanies !== prevProps.errorCompanies &&
      this.props.errorCompanies === "ОК"
    ) {
      this.props.getCompanies();
    }

    if (
      this.props.listGeofences !== prevProps.listGeofences &&
      this.props.listGeofences
    ) {
      var data = this.props.listGeofences ? this.props.listGeofences : [];
      this.setState({ geofence: {}, listGeofences: data });
    }

    if (
      !_.isEmpty(this.props.companies) &&
      this.props.companies !== null &&
      this.props.companies.length &&
      this.props.companies.length === 1 &&
      !this.state.oneCompanyFlag
    ) {
      this.props.getGeofences(this.props.companies[0].id);
      this.setState({
        company: this.props.companies[0],
        oneCompanyFlag: !this.state.oneCompanyFlag,
      });
    }
    if (this.state.company !== prevState.company && this.state.company) {
      this.setState({
        bounds: [],
        geofence: [],
      });
    }
  }
  getDates = (startDate, endDate) => {
    this.setState({
      from: startDate,
      to: endDate,
    });
  };

  onSelectCompany = (company) => {
    console.log("11111111111111111111111111111", company)
    if (company) {
      this.props.getGeofences(company.id);
    }
    this.setState({ company, geofence: {} });
  };

  onSetBounds = (item) => {
    const pol = this.state.listGeofences.filter((l) => l.polygons === item);
    this.setState({
      bounds: item,
      geofence: pol[0] || [],
    });
  };

  onSetName = (name) => {
    this.setState({
      geofence: name,
    });
  };

  onClickToMakeReport = () => {
    this.setState({
      rangeFromTo: getRangeToFrom(this.state.from, this.state.to),
      requestGroupReport: true,
    });
    if (this.state.geofence.id && this.state.company) {
      this.props.getGroupReport(
        this.state.company.id,
        this.state.geofence.id,
        this.state.from.format().slice(0, -6),
        this.state.to.format().slice(0, -6)
      );
    } else {
      this.props.getGroupReport(
        this.state.company.id,
        null,
        this.state.from.format().slice(0, -6),
        this.state.to.format().slice(0, -6)
      );
    }
  };

  handleDoubleClick = () => {
    this.setState({ showExtra: !this.state.showExtra });
  }

  render() {
    if (!this.props.loadingGeofences || !this.props.loadingCompanies) {
      return (
        <React.Fragment>

          <Error error={this.state.errorCompanies} />
          <Error error={this.state.errorGeofences} />
          <Error error={this.state.errorGroupStats} />

          <div className="card-deck">
            <div className="col-md-4 col-sm-12 card mb-3 overflow-hidden">
              <div className="card-body position-relative">
                <h3 className="text-center mb-2">Компания</h3>
                <DropdownCompanies
                  selectCompany={(company) => this.onSelectCompany(company)}
                />
                <h3 className="text-center mb-2 mt-3">Объект</h3>
                <DropdownGeofences
                  onSetBounds={this.onSetBounds}
                  geofence={this.state.geofence}
                />

                <button
                  className="btn btn-lg btn-primary mt-4 w-100"
                  onClick={this.onClickToMakeReport}
                >
                  Сформировать отчет
                </button>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 mb-3 card overflow-hidden">
              <Calendar
                selectPeriod={this.getDates}
                from={this.state.from}
                to={this.state.to}
              />
            </div>

            <div className="col-md-4 col-sm-12 mb-3 card overflow-hidden">
              <ReportMap
                listGeofences={this.state.listGeofences}
                loadingGeofences={this.state.loadingGeofences}
                bounds={this.state.bounds}
                onSetName={this.onSetName}
                oneCompanyFlag={this.state.oneCompanyFlag}
                getGeofences={this.props.getGeofences}
                company={this.state.company}
              />
            </div>
          </div>

          <div className="card-deck">
            <div className="col-md-12 col-sm-12 card mb-3 overflow-hidden">
              <div className="card-header pb-0">
                <p>
                  Отчёт о количестве работников на объекте. Период:{" "}
                  <span className="text-info" role="button" onDoubleClick={this.handleDoubleClick} style={{ userSelect: "none" }}>
                    {this.state.from.format("DD.MM.YYYY") +
                      " - " +
                      this.state.to.format("DD.MM.YYYY")}
                  </span>
                  . Объект:{" "}
                  <span className="text-info">
                    {_.has(this.state.geofence, "name")
                      ? this.state.geofence.name
                      : "не выбран"}
                  </span>
                  .
                </p>
              </div>

              <div className="card-body position-relative">
                {this.state.requestGroupReport
                  ? !this.state.loadingGroupStats
                    ? !_.isString(this.state.errorGroupStats)
                      ? <ReportActiveTable
                        groupStatsItemsWithoutGeofence={this.state.groupStatsItemsWithoutGeofence}
                        groupStatsItemsWithGeofence={this.state.groupStatsItemsWithGeofence}
                        rangeFromTo={this.state.rangeFromTo}
                        showExtra={this.state.showExtra}
                      />
                      : null
                    : <div className="d-flex justify-content-center">Загрузка данных...</div>
                  : ''
                }
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Loader />;
    }
  }
}
export default ReportActive;
