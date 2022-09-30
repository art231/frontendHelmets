import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import main from "../../../scss/style.scss";
import Loader from "../loader/loader";
import helmetsIcon from "../../../assets/img/helmets/helmets";
import icons from "../../../assets/img/helmets/IconsSVG";
import { timeConverter } from "../../common/dateHelper";
import {listHelmetsSortByIncreaseSerial} from '../../common/selectorsHelper';

class ConditionsHelmets extends Component {
  state = {
    companiesDict: {},
    form: {
      serial: "",
      sim: "",
      name: "",
    },
    itemID: "",
    interval: null,
    error: undefined,
    errorHelmet: undefined,
    loading: true,
  };

  componentDidMount() {
    this.pollForStatus();
    this.props.getConditionsHelmets();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
     
      this.props.error !== prevProps.error ||
      this.props.loadingHelmet !== prevProps.loadingHelmet ||
      this.props.deleteHelmet !== prevProps.deleteHelmet ||
      this.props.errorHelmet !== prevProps.errorHelmet ||
      this.props.updateHelmet !== prevProps.updateHelmet
    ) {
      this.setState({
        companiesDict: this.props.companiesDict
          ? this.props.companiesDict
          : this.state.companiesDict,
        error: this.props.error,
        loading: this.props.loading,
        errorHelmet: this.props.errorHelmet,
        loadingHelmet: this.props.loadingHelmet,
      });
    }

     if (this.props.helmets !== prevProps.helmets) {
       this.setState({helmets: listHelmetsSortByIncreaseSerial(this.props.helmets ? this.props.helmets : this.state.helmets)});
     }

    if (
      this.props.errorHelmet !== prevProps.errorHelmet &&
      this.props.errorHelmet === "ОК"
    ) {
      this.props.getConditionsHelmets();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  pollForStatus = () => {
    // First clear old interval if one exists
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    this.state.interval = setInterval(
      () => this.props.getConditionsHelmets(),
      5000
    );
  };

  onChangeHandler = (event, field) => {
    event.preventDefault();
    let text = event.target.value;
    let form = { ...this.state.form };

    if (field === "serial") {
      form.serial = text;
    } else if (field === "sim") {
      form.sim = text;
    } else {
      form.name = text;
    }

    this.setState({
      form,
    });
  };

  delete = () => {
    this.props.deleteHelmet(this.state.itemID);
  };

  create = () => {
    let form = { ...this.state.form };
    this.props.postHelmet(form);
    this.setState({
      form: {
        serial: "",
        sim: "",
        name: "",
      },
    });
  };

  update = () => {
    let form = { ...this.state.form };
    this.props.updateHelmet(this.state.itemID, form);
  };

  saveId = (id) => {
    this.setState({
      itemID: id,
    });
  };

  setItemsParameter = ({ serial, name, sim, id }) => {
    let form = { serial, name, sim };
    let itemID = id;
    this.setState({ form, itemID });
  };

  correct = (id, serial) => {};

  closedAlert = () => {
    this.setState({
      error: undefined,
      errorHelmet: undefined,
    });
  };

  renderTableList() {
    let { companiesDict, helmets } = this.state;

    if (!_.isString(this.state.error) && !_.isEmpty(helmets)) {
      return (
        <table
          className="table table-sm mb-0 table-striped table-dashboard fs--1 data-table border-bottom border-200"
          data-options='{"searching":false,"responsive":false,"pageLength":50,"info":false,"lengthChange":false,"sWrapper":"falcon-data-table-wrapper","dom":"<&#39;row mx-1&#39;<&#39;col-sm-12 col-md-6&#39;l><&#39;col-sm-12 col-md-6&#39;f>><&#39;table-responsive&#39;tr><&#39;row no-gutters px-1 py-3 align-items-center justify-content-center&#39;<&#39;col-auto&#39;p>>","language":{"paginate":{"next":"<span class=\"fas fa-chevron-right\"></span>","previous":"<span class=\"fas fa-chevron-left\"></span>"}}}'
        >
          <thead className="bg-200 text-900">
            <tr>
              <th className="align-middle sort" style={{ minWidth: "250px" }}>
                Серийный номер
              </th>
              <th className="align-middle sort">Название</th>
              <th className="align-middle sort">Компания</th>
              <th
                className="align-middle sort pl-5"
                style={{ minWidth: "200px" }}
              >
                SIM
              </th>
              <th
                className="align-middle sort pl-5"
                style={{ minWidth: "200px" }}
              >
                Статус
              </th>

              <th className="align-middle no-sort"></th>
            </tr>
          </thead>
          <tbody id="list-helmets">
            {helmets?.map(({ attributes, condition }, index) => {
              let company;
              if (!_.isEmpty(companiesDict)) {
                for (let key in companiesDict) {
                  if (attributes.distributorCompanyId === Number(key)) {
                    company = companiesDict[key].name;
                  }
                }
              }

              const time = timeConverter(
                condition.online.noDataDuration
              ).time.split(" ");
              let day;
              let hours;
              let minutes;

              if(time.length === 1) {
                day = 0;
                hours = 0;
                minutes = 0;
              }
              else if (time.length === 4) {
                day = +time[0].match(/\d+/)[0];
                hours = +time[1].match(/\d+/)[0];
                minutes = +time[2].match(/\d+/)[0];
              } else if (time.length === 3) {
                day = 0;
                hours = +time[0].match(/\d+/)[0];
                minutes = +time[1].match(/\d+/)[0];
              } else if (time.length === 2) {
                day = 0;
                hours = 0;
                minutes = +time[0].match(/\d+/)[0];
              }

          

              const helmetState = [
                condition.on.condition,
                "unknown",
                condition.motion.condition,
              ];
              const strHelmetState = helmetState.join("_").toLowerCase();
              const on = helmetsIcon.helmets.filter((h) => h[strHelmetState]);

              return (
                <tr
                  key={`${index}-${Math.random()}`}
                  className="btn-reveal-trigger"
                >
                  <td className="py-2 align-middle white-space-nowrap customer-name-column">
                    <Link to={"/helmet/" + attributes.id}>
                      <div className="media d-flex align-items-center">
                        <div className="text-center mr-2">
                          <span className="icon-hard-hat fas fa-hard-hat text-dark"></span>
                        </div>
                        <div className="media-body">
                          <h5 className="mb-0 fs--1">{attributes.serial}</h5>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-2 align-middle">{attributes.name}</td>
                  <td className="py-2 align-middle white-space-nowrap">
                    {" "}
                    {company}
                  </td>
                  <td className="py-2 align-middle pl-5">
                    <a href={"tel:" + attributes.sim}>{attributes.sim}</a>
                  </td>
                  <td
                    className="py-2 align-middle pl-5"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <div style={{ width: "100px" }}>
                      <span
                        className={
                          condition.online.condition === "Unknown"
                            ? "bg-secondary rounded py-1 px-2  text-white my-2"
                            : condition.online.noDataDuration <
                              condition.online.alarmNoDataDuration
                            ? "bg-success rounded py-1 px-2 text-white my-2"
                            : "bg-danger rounded py-1 px-2 text-white my-2"
                        }
                      >
                        {condition.online.condition === "Unknown"
                          ? "нет данных"
                          : day === 0 && hours === 0
                          ? minutes < 1
                            ? "online"
                            : `более ${minutes} м`
                          : day > 1
                          ? `более ${day} д`
                          : day === 1
                            ? `более 1 д ${hours} ч`
                            : `более ${hours} ч`}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "35%",
                      }}
                    >
                      <div className="mx-2" style={{ textAlign: "center" }}>
                        {condition.on.noDataDuration <
                        condition.on.alarmNoDataDuration ? (
                          <img
                            src={on[0][strHelmetState]}
                            className={main.OnSatus}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Состояние: ${
                              condition.on.condition === "Unknown"
                                ? "Неизвестно"
                                : condition.on.condition === "Yes"
                                ? "Надета"
                                : "Снята"
                            } \nОриентация: Неизвестно\nАктивность: ${
                              condition.motion.condition === "Unknown"
                                ? "Неизвестно"
                                : condition.motion.condition === "Still"
                                ? "Неподвижна"
                                : "Двигается"
                            }`}
                          />
                        ) : (
                          <img
                            src={on[0][strHelmetState]}
                            className={main.OnSatus}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={`Состояние: ${
                              condition.on.condition === "No"
                                ? "Снята"
                                : "Надета"
                            }`}
                          />
                        )}
                      </div>
                      <div className="mx-2">
                        {condition.gps.condition === null || condition.online.condition !== "Online"
                          ? condition.online.noDataDuration <
                            condition.online.alarmNoDataDuration
                            ? icons.gpsIconGrey
                            : icons.gpsOffIconGrey
                          : condition.online.noDataDuration <
                            condition.online.alarmNoDataDuration
                          ? icons.gpsIcon
                          : icons.gpsOffIcon}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="mx-2">
                        {condition.charge.condition === null ? (
                          <>
                            {icons.batteryIconGrey}
                          </>
                        ) : condition.online.noDataDuration <
                          condition.online.alarmNoDataDuration ? (
                          <>
                            <span className={main.txtBattery}>
                              {condition.charge.condition.percent > 0 ? condition?.charge?.condition?.percent +"%" : null }
                            </span>
                            {icons.batteryIcon}
                          </>
                        ) : (
                          <>
                            <span className="text-secondary mr-1 font-weight-bold">
                              {condition.charge.condition.percent > 0 ? condition?.charge?.condition?.percent +"%" : null }
                            </span>
                            {icons.batteryIconGrey}
                          </>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-2 align-middle white-space-nowrap">
                    <div className="dropdown text-sans-serif">
                      <button
                        className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal mr-3"
                        type="button"
                        id="customer-dropdown-0"
                        data-toggle="dropdown"
                        data-boundary="viewport"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="fas fa-ellipsis-h fs--1"></span>
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-right border py-0"
                        aria-labelledby="customer-dropdown-0"
                      >
                        <div className="bg-white py-2">
                          <span
                            className="dropdown-item cursor-pointer"
                            to="#!"
                            onClick={() => this.setItemsParameter(attributes)}
                            data-target="#UpdateModal"
                            data-toggle="modal"
                          >
                            Изменить
                          </span>
                          {/*onClick={() => this.delete(item.id, item.serial)}*/}
                          <span
                            className="dropdown-item cursor-pointer text-danger"
                            onClick={() => this.saveId(attributes.id)}
                            data-target="#DeleteModal"
                            data-toggle="modal"
                          >
                            Удалить
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return <div className={main.NotFound}>Нет данных</div>;
    }
  }

  render() {
    let { error, helmets, errorHelmet, form } = this.state;
    if (!this.state.loading || !this.state.loadingHelmet) {
      return (
        <div className="card mb-3">
          {(error !== "ОК" && error) ||
          (errorHelmet !== "ОК" && errorHelmet) ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Ошибка!</strong> {error || errorHelmet}
              <button
                className="close"
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => this.closedAlert()}
              >
                <span className="font-weight-light" aria-hidden="true">
                  ×
                </span>
              </button>
              <div
                className="d-inline-block ml-2 cursor-pointer"
                onClick={() => location.reload()}
              >
                <i
                  className="fas fa-sync-alt"
                  style={{ width: "1rem", height: "1rem", color: "gray" }}
                ></i>
              </div>
            </div>
          ) : null}

          <div className="card-header">
            <div className="row align-items-center justify-content-between">
              <div className="col-4 col-sm-auto d-flex align-items-center pr-0">
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                  Список касок, зарегистрированных в компании
                </h5>
              </div>
              {!_.isEmpty(helmets) ? (
                <div className="col-8 col-sm-auto text-right pl-2">
                  <div id="customer-table-actions">
                    <button
                      className="btn btn-falcon-default btn-sm"
                      type="button"
                    >
                      <span
                        className="fas fa-plus"
                        data-fa-transform="shrink-3 down-2"
                      ></span>
                      <span
                        className="d-none d-sm-inline-block ml-1"
                        data-toggle="modal"
                        data-target="#CreateModal"
                      >
                        Новая каска
                      </span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="card-body p-0">
            <div className="falcon-data-table">{this.renderTableList()}</div>
          </div>

          <div
            className="modal fade"
            id="CreateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="CreateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title m-auto" id="CreateModalLabel">
                    Добавить каску
                  </h5>
                  <button
                    className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-body text-center">
                  <div className="form-group">
                    <label htmlFor="name"></label>
                    <input
                      onChange={(event) =>
                        this.onChangeHandler(event, "serial")
                      }
                      value={form.serial}
                      className="form-control"
                      id="serial"
                      type="text"
                      placeholder="Серия"
                    />

                    <label htmlFor="name"></label>
                    <input
                      onChange={(event) => this.onChangeHandler(event, "name")}
                      value={form.name}
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Название"
                    />

                    <label htmlFor="name"></label>
                    <input
                      onChange={(event) => this.onChangeHandler(event, "sim")}
                      value={form.sim}
                      className="form-control"
                      type="text"
                      placeholder="SIM"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    id="modal-closed"
                    className="btn btn-success btn-sm"
                    type="button"
                    onClick={() => this.create()}
                    data-dismiss="modal"
                  >
                    Добавить
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    data-dismiss="modal"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="UpdateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="UpdateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title m-auto" id="UpdateModalLabel">
                    Редактировать каску
                  </h5>
                  <button
                    className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-body text-center">
                  <div className="form-group">
                    <label htmlFor="serial"></label>
                    <input
                      placeholder={form.serial}
                      className="form-control"
                      id="serial"
                      type="text"
                      disabled
                    />

                    <label htmlFor="name"></label>
                    <input
                      onChange={(event) => this.onChangeHandler(event, "name")}
                      value={form.name}
                      className="form-control"
                      id="name"
                      type="text"
                    />

                    <label htmlFor="sim"></label>
                    <input
                      onChange={(event) => this.onChangeHandler(event, "sim")}
                      value={form.sim}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    id="modal-closed"
                    className="btn btn-success btn-sm"
                    type="button"
                    onClick={() => this.update()}
                    data-dismiss="modal"
                  >
                    Изменить
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    data-dismiss="modal"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="DeleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="DeleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title m-auto" id="DeleteModalLabel">
                    Вы уверены что хотите удалить каску
                  </h5>
                  <button
                    className="close text-black position-absolute t-0 r-0 mt-1 mr-1"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    id="modal-closed"
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={() => this.delete()}
                    data-dismiss="modal"
                  >
                    Да
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    data-dismiss="modal"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
export default ConditionsHelmets;
