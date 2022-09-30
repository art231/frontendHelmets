import React, { Fragment } from "react";
import {
  addNullsToItems,
  colWithTotalDuration,
  showTimeInReports,
  showAllTimesInReports,
} from "../../common/reportCardHelper";
import moment from "moment-timezone";
import _ from "lodash";

const ReportCardTable = ({
  statsItems,
  helmetsDict,
  rangeFromTo,
  showExtra,
}) => {

  const weekDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const month = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const dash = "-";
  const empty = "";

  if (_.isEmpty(statsItems) || _.isEmpty(helmetsDict)) {
    return (
      <Fragment>
        <div className="d-flex justify-content-center">Нет данных</div>
      </Fragment>
    )
  } else {
    const statsItemsWithNulls = addNullsToItems(statsItems, rangeFromTo);
    const TotalDuration = colWithTotalDuration(statsItemsWithNulls, helmetsDict.length);
    return (
      <Fragment>
        <table className="table table-hover">
          <thead className="fs--1" id="card-report-header">
            <tr>
              <th scope="col" className="text-center"></th>
              {rangeFromTo
                ? rangeFromTo.map((rangeItem) => (
                  <th
                    scope="col"
                    key={Math.random() * rangeFromTo.length}
                    className={
                      moment(rangeItem).day() === 0 || moment(rangeItem).day() === 6
                        ? "table-danger text-center"
                        : "text-center"
                    }
                  >
                    {" "}
                    {weekDays[moment(rangeItem).day()]}{" "}
                  </th>
                ))
                : empty}
              <th scope="col" className="text-center"></th>
            </tr>
            <tr>
              <th scope="col" className="text-center">
                Сотрудник
              </th>
              {rangeFromTo
                ? rangeFromTo.map((rangeItem) => (
                  <th
                    scope="col"
                    key={Math.random() * rangeFromTo.length}
                    className={
                      moment(rangeItem).day() === 0 ||
                        moment(rangeItem).day() === 6
                        ? "table-danger text-center"
                        : "text-center"
                    }
                  >
                    {" "}
                    {moment(rangeItem).format("DD") + " " + month[moment(rangeItem).format("M") - 1]}{" "}
                  </th>
                ))
                : empty}
              <th
                scope="col"
                className="text-center font-weight-bold"
                style={{ background: "var(--grey-light)" }}
              >
                ИТОГО
              </th>
            </tr>
          </thead>
          <tbody id="card-report">
            {helmetsDict
              ? helmetsDict.map((item, index) => (
                <tr key={Math.random() * rangeFromTo.length}>
                  <th className="text-center">
                    {item.name}
                  </th>
                  {statsItemsWithNulls.map((item) => (
                    <td
                      scope="col"
                      className={moment(item.from).day() === 0 || moment(item.from).day() === 6
                        ? "table-danger text-center"
                        : "text-center"
                      }
                      key={Math.random() * rangeFromTo.length}
                    >
                      {!showExtra
                        ? item.items[index].activeDuration === 0 ? dash : item.items[index].activeDuration === null ? empty : showTimeInReports(item.items[index].activeDuration)
                        : item.items[index].activeDuration === 0 ? dash : item.items[index].activeDuration === null ? empty : showAllTimesInReports(item.items[index].motionDuration, item.items[index].activeDuration, item.items[index].onDuration).map(item => <p className="m-0" key={Math.random() * rangeFromTo.length}>{item}</p>)
                      }
                    </td>
                  ))}
                  <td
                    scope="col"
                    key={Math.random() * rangeFromTo.length}
                    className="text-center font-weight-bold"
                    style={{ background: "var(--grey-light)" }}
                  >
                    {statsItemsWithNulls.find(
                      (elem) =>
                        elem.items[index].activeDuration !== 0 &&
                        elem.items[index].activeDuration !== null
                    )
                      ? !showExtra
                        ? showTimeInReports(TotalDuration[1][index])
                        : showAllTimesInReports(TotalDuration[0][index], TotalDuration[1][index], TotalDuration[2][index]).map(item => <p className="m-0" key={Math.random() * rangeFromTo.length}>{item}</p>)
                      : dash}
                  </td>
                </tr>
              ))
              : empty}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ReportCardTable;
