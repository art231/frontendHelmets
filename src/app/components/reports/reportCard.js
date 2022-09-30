import React, { Component, Fragment } from "react";
import _, { add } from "lodash";
import Loader from "../loader/loader";
import Calendar from "../calendar/calendar";
import moment from "moment-timezone";
import { getRangeToFrom } from "../../common/dateHelper";
import DropdownCompanies from "./dropdownCompanies";
import DropdownGeofences from "./dropdownGeofences";
import ReportMap from "./reportMap";
import ReportCardTable from './reportCardTable';
import Error from "../error/error";

class ReportCard extends Component {
  state = {
    company: null,
    loadingCompanies: false,
    geofence: {},
    listGeofences: [],
    errorGeofences: undefined,
    loadingGeofences: true,
    from: moment().subtract(7, "days"),
    to: moment().subtract(1, "days"),
    rangeFromTo: [],
    statsItems: [],
    helmetsDict: [],
    errorReportCard: undefined,
    loadingReportCard: false,
    requestReportCard: false,
    oneCompanyFlag: false,
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
      (this.props.statsItems !== prevProps.statsItems &&
        this.props.statsItems) ||
      (this.props.helmetsDict !== prevProps.helmetsDict &&
        this.props.helmetsDict) ||
      this.props.errorGeofences !== prevProps.errorGeofences ||
      this.props.loadingGeofences !== prevProps.loadingGeofences ||
      this.props.errorReportCard !== prevProps.errorReportCard ||
      this.props.loadingReportCard !== prevProps.loadingReportCard ||
      this.props.getReportCard !== prevProps.getReportCard ||
      this.props.loadingCompanies !== prevProps.loadingCompanies
    ) {
      this.setState({
        errorGeofences: this.props.errorGeofences,
        loadingGeofences: this.props.loadingGeofences,
        statsItems: this.props.statsItems ? this.props.statsItems : [],
        helmetsDict: this.props.helmetsDict ? this.props.helmetsDict : [],
        errorReportCard: this.props.errorReportCard,
        loadingReportCard: this.props.loadingReportCard,
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

  onClickToMakeReport = () => {
    this.setState({
      rangeFromTo: getRangeToFrom(this.state.from, this.state.to),
      requestReportCard: true,
    });
    if (this.state.company) {
      this.props.getReportCard(
        this.state.company.id,
        this.state.geofence.id,
        this.state.from.format().slice(0, -6),
        this.state.to.format().slice(0, -6)
      );
    }
  };

  handleDoubleClick = () => {
    this.setState({ showExtra: !this.state.showExtra });
  }

  render() {
    if (!this.state.loadingCompanies || !this.state.loadingGeofences) {
      return (
        <React.Fragment>

          <Error error={this.state.errorCompanies} />
          <Error error={this.state.errorGeofences} />
          <Error error={this.state.errorReportCard} />

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
              <ReportMap listGeofences={this.state.listGeofences} loadingGeofences={this.state.loadingGeofences} bounds={this.state.bounds} />
            </div>
          </div>

          <div className="card-deck">
            <div className="col-md-12 col-sm-12 card mb-3 overflow-hidden">
              <div className="card-header pb-0">
                <p>
                  Табель рабочего времени:{" "}
                  <span className="text-info" role="button" onDoubleClick={this.handleDoubleClick} style={{ userSelect: "none" }}>
                    {this.state.from.format("DD.MM.YYYY") + " - " + this.state.to.format("DD.MM.YYYY")}
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

              <div className="card-body position-relative overflow-auto">
                {this.state.requestReportCard
                  ? !this.state.loadingReportCard
                    ? !_.isString(this.state.errorReportCard)
                      ? <ReportCardTable
                        statsItems={this.state.statsItems}
                        helmetsDict={this.state.helmetsDict}
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

export default ReportCard;
