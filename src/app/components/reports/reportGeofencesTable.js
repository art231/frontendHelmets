import React, { Fragment } from "react";
import {
  showTimeInReports,
  showAllTimesInReports,
} from "../../common/reportCardHelper";
import _ from "lodash";

const ReportCardTable = ({
  statsItemsWithoutNull,
  statsNullItem,
  helmetsDict,
  rangeFromTo,
  listGeofences,
  showExtra,
}) => {

  const dash = "-";
  const empty = "";
  const arrayIdGeofences = Object.keys(statsItemsWithoutNull);
  const arrayNamesGeofences = getNamesGeofences(arrayIdGeofences, listGeofences);

  if (_.isEmpty(statsItemsWithoutNull) || _.isEmpty(helmetsDict)) {
    return (
      <Fragment>
        <div className="d-flex justify-content-center">Нет данных</div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <table className="table table-hover">
          <thead className="fs--1" id="card-report-header">
            <tr>
              <th scope="col" className="text-center">Каски</th>
              {arrayNamesGeofences.map(name => (
                <th
                  scope="col"
                  className="text-center"
                  key={Math.random() * rangeFromTo.length}
                >
                  {name}
                </th>
              ))
              }
              <th scope="col" className="text-center">Вне объекта</th>
            </tr>
          </thead>
          <tbody id="card-report">
            {helmetsDict.map((item, index) => (
              <tr key={Math.random() * rangeFromTo.length}>
                <th key={item.serial} className="text-center">
                  {item.name}
                </th>
                {Object.keys(statsItemsWithoutNull).map(objectNum => (
                  <td
                    scope="col"
                    className="text-center"
                    key={Math.random() * rangeFromTo.length}
                  >
                    {!showExtra
                      ? statsItemsWithoutNull[objectNum][item.serial] === undefined
                        ? dash
                        : statsItemsWithoutNull[objectNum][item.serial].activeDuration === null
                          ? empty
                          : showTimeInReports(statsItemsWithoutNull[objectNum][item.serial].activeDuration)
                      : statsItemsWithoutNull[objectNum][item.serial] === undefined
                        ? dash : statsItemsWithoutNull[objectNum][item.serial].activeDuration === null
                          ? empty
                          : showAllTimesInReports(
                            statsItemsWithoutNull[objectNum][item.serial].motionDuration,
                            statsItemsWithoutNull[objectNum][item.serial].activeDuration,
                            statsItemsWithoutNull[objectNum][item.serial].onDuration
                          ).map(item => <p className="m-0" key={Math.random() * rangeFromTo.length}>{item}</p>)
                    }
                  </td>
                ))}
                <td
                  scope="col"
                  key={Math.random() * rangeFromTo.length}
                  className="text-center"
                >
                  {!showExtra
                    ? statsNullItem[item.serial] === undefined
                      ? dash
                      : statsNullItem[item.serial].activeDuration === null
                        ? empty
                        : showTimeInReports(statsNullItem[item.serial].activeDuration)
                    : statsNullItem[item.serial] === undefined
                      ? dash
                      : statsNullItem[item.serial].activeDuration === null
                        ? empty
                        : showAllTimesInReports(
                          statsNullItem[item.serial].motionDuration,
                          statsNullItem[item.serial].activeDuration,
                          statsNullItem[item.serial].onDuration
                        ).map(item => <p className="m-0" key={Math.random() * rangeFromTo.length}>{item}</p>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const getNamesGeofences = (arrayIdGeofences, listGeofences) => {
  let arrayNamesGeofences = [];
  arrayIdGeofences.map(id => {
    let obj = listGeofences.find(item => item.id == id);
    if (obj) {
      arrayNamesGeofences.push(obj.name);
    }
  })
  return arrayNamesGeofences;
}

export default ReportCardTable;
