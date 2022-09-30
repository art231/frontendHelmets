import React, { Component, Fragment } from "react";
import _ from "lodash";
import Loader from "../loader/loader";
import Calendar from "../calendar/calendar";
import moment from "moment-timezone";
import { getRangeToFrom } from "../../common/dateHelper";
import DropdownCompanies from "./dropdownCompanies";
import ReportMap from "./reportMap";
import ReportGeofencesTable from './reportGeofencesTable';
import Error from "../error/error";

class ReportGeofences extends Component {
  state = {
    company: null,
    geofence: {},
    listGeofences: [],
    errorGeofences: undefined,
    loadingGeofences: true,
    from: moment().subtract(7, "days"),
    to: moment().subtract(1, "days"),
    rangeFromTo: [],
    statsItemsWithoutNull: {},
    statsNullItem: {},
    helmetsDict: [],
    oneCompanyFlag: false,
    bounds: [],
    showExtra: false,
    requestReportGeofences: false,
  };

  componentDidMount() {
    this.props.getCompanies();
    this.setState({
      rangeFromTo: getRangeToFrom(this.state.from, this.state.to),
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (this.props.listGeofences !== prevProps.listGeofences && this.props.listGeofences) ||
      (this.props.statsItemsWithoutNull !== prevProps.statsItemsWithoutNull && this.props.statsItemsWithoutNull) ||
      (this.props.statsNullItem !== prevProps.statsNullItem && this.props.statsNullItem) ||
      (this.props.helmetsDict !== prevProps.helmetsDict && this.props.helmetsDict) ||
      this.props.errorGeofences !== prevProps.errorGeofences ||
      this.props.loadingGeofences !== prevProps.loadingGeofences ||
      this.props.errorReportGeofences !== prevProps.errorReportGeofences ||
      this.props.loadingReportGeofences !== prevProps.loadingReportGeofences ||
      this.props.getReportGeofences !== prevProps.getReportGeofences ||
      this.props.loadingCompanies !== prevProps.loadingCompanies
    ) {
      this.setState({
        errorGeofences: this.props.errorGeofences,
        loadingGeofences: this.props.loadingGeofences,
        statsItemsWithoutNull: this.props.statsItemsWithoutNull ? this.props.statsItemsWithoutNull : {},
        statsNullItem: this.props.statsNullItem ? this.props.statsNullItem : {},
        helmetsDict: this.props.helmetsDict ? this.props.helmetsDict : [],
        errorReportGeofences: this.props.errorReportGeofences,
        loadingReportGeofences: this.props.loadingReportGeofences,
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
      requestReportGeofences: true,
    });
    if (this.state.company) {
      this.props.getReportGeofences(
        this.state.company.id,
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
        <Fragment>

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
                  Отчёт о времени работников на объекте. Период:{" "}
                  <span className="text-info" role="button" onDoubleClick={this.handleDoubleClick} style={{ userSelect: "none" }}>
                    {this.state.from.format("DD.MM.YYYY") +
                      " - " +
                      this.state.to.format("DD.MM.YYYY")}
                  </span>
                </p>
              </div>

              <div className="card-body position-relative">
                {this.state.requestReportGeofences
                  ? !this.state.loadingReportGeofences
                    ? !_.isString(this.state.errorReportGeofences)
                      ? <ReportGeofencesTable
                        statsItemsWithoutNull={this.state.statsItemsWithoutNull}
                        statsNullItem={this.state.statsNullItem}
                        helmetsDict={this.state.helmetsDict}
                        rangeFromTo={this.state.rangeFromTo}
                        listGeofences={this.state.listGeofences}
                        showExtra={this.state.showExtra}
                      />
                      : null
                    : <div className="d-flex justify-content-center">Загрузка данных...</div>
                  : ''
                }
              </div>
            </div>
          </div>

        </Fragment>
      )
    } else {
      return <Loader />;
    }
  }
}

export default ReportGeofences;
