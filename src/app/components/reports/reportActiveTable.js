import React, { Fragment } from "react";
import { showTimeInReports } from "../../common/reportCardHelper";
import { addNullsToItems } from "../../common/reportActiveHelper";
import moment from "moment-timezone";
import _ from "lodash";

const ReportActiveTable = ({
  groupStatsItemsWithoutGeofence,
  groupStatsItemsWithGeofence,
  rangeFromTo,
  showExtra,
}) => {

  const ItemsWithoutGeofenceWithNulls = addNullsToItems(groupStatsItemsWithoutGeofence, rangeFromTo);
  const ItemsWithGeofenceWithNulls = addNullsToItems(groupStatsItemsWithGeofence, rangeFromTo);
  const dash = "-";
  return (
    <Fragment>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Дата
          </th>
            <th scope="col" className="text-center">
              Количество активных касок внутри объекта
          </th>
            <th scope="col" className="text-center">
              Суммарно время активности касок внутри объекта
          </th>
            <th scope="col" className="text-center">
              Количество активных касок вне объекта
          </th>
            <th scope="col" className="text-center">
              Суммарно время активности касок вне объекта
          </th>
            <th scope="col" className="text-center">
              Количество неактивных касок
          </th>
          </tr>
        </thead>
        <tbody id="group-report">
          {groupStatsItemsWithoutGeofence !== null && groupStatsItemsWithGeofence !== null && !_.isEmpty(groupStatsItemsWithGeofence)
            // Geofence selected 
            ? rangeFromTo.map((item, index) => {
              if (ItemsWithoutGeofenceWithNulls[index] === undefined || ItemsWithGeofenceWithNulls[index] === undefined) {
                console.log("Invalid state"); //TODO FIX!
                console.log(ItemsWithoutGeofenceWithNulls[index]);
                console.log(ItemsWithGeofenceWithNulls[index]);
                return;
              }

              const highlightClassName = moment(item).day() === 6 || moment(item).day() === 0
                ? "table-danger text-center"
                : "text-center";

              const motionConditionWithout =
                ItemsWithoutGeofenceWithNulls[index].motion !== null &&
                ItemsWithoutGeofenceWithNulls[index].motion !== 0;
              const motionConditionWith =
                ItemsWithGeofenceWithNulls[index].motion !== null &&
                ItemsWithGeofenceWithNulls[index].motion !== 0;

              const activeConditionWithout =
                ItemsWithoutGeofenceWithNulls[index].active !== null &&
                ItemsWithoutGeofenceWithNulls[index].active !== 0;
              const activeConditionWith =
                ItemsWithGeofenceWithNulls[index].active !== null &&
                ItemsWithGeofenceWithNulls[index].active !== 0;

              const onConditionWithout =
                ItemsWithoutGeofenceWithNulls[index].on !== null &&
                ItemsWithoutGeofenceWithNulls[index].on !== 0;
              const onConditionWith =
                ItemsWithGeofenceWithNulls[index].on !== null &&
                ItemsWithGeofenceWithNulls[index].on !== 0;

              return (
                <Fragment>
                  {!showExtra
                    // Geofence selected; showExtra === false
                    ? <tr key={Math.random() * rangeFromTo.length}>
                      <th scope="col" className={highlightClassName}>
                        {item.format("DD.MM.YYYY")}
                      </th>
                      <td scope="col" className={highlightClassName}>
                        {activeConditionWith && ItemsWithGeofenceWithNulls[index].active.count !== 0
                          ? ItemsWithGeofenceWithNulls[index].active.count
                          : dash}
                      </td>
                      <td scope="col" className={highlightClassName}>
                        {activeConditionWith && ItemsWithGeofenceWithNulls[index].active.duration !== 0
                          ? showTimeInReports(ItemsWithGeofenceWithNulls[index].active.duration)
                          : dash}
                      </td>
                      <td scope="col" className={highlightClassName}>
                        {activeConditionWith && activeConditionWithout
                          ? ItemsWithoutGeofenceWithNulls[index].active.count - ItemsWithGeofenceWithNulls[index].active.count
                          : dash}
                      </td>
                      <td scope="col" className={highlightClassName}>
                        {activeConditionWith && activeConditionWithout
                          ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].active.duration - ItemsWithGeofenceWithNulls[index].active.duration)
                          : dash}
                      </td>
                      <td scope="col" className={highlightClassName}>
                        {activeConditionWith && ItemsWithGeofenceWithNulls[index].count !== null && ItemsWithGeofenceWithNulls[index].count !== 0
                          ? ItemsWithGeofenceWithNulls[index].count - ItemsWithGeofenceWithNulls[index].active.count
                          : dash}
                      </td>
                    </tr>
                    // Geofence selected; showExtra === true
                    : <tr key={Math.random() * rangeFromTo.length}>
                      <th scope="col" className={highlightClassName}>
                        {item.format("DD.MM.YYYY")}
                      </th>
                      <td scope="col" className={highlightClassName}>
                        <p className="m-0">
                          {motionConditionWith && ItemsWithGeofenceWithNulls[index].motion.count !== 0
                            ? ItemsWithGeofenceWithNulls[index].motion.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {activeConditionWith && ItemsWithGeofenceWithNulls[index].active.count !== 0
                            ? ItemsWithGeofenceWithNulls[index].active.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {onConditionWith && ItemsWithGeofenceWithNulls[index].on.count !== 0
                            ? ItemsWithGeofenceWithNulls[index].on.count
                            : dash}
                        </p>
                      </td>
                      <td scope="col" className={highlightClassName}>
                        <p className="m-0">
                          {motionConditionWith && ItemsWithGeofenceWithNulls[index].motion.duration !== 0
                            ? showTimeInReports(ItemsWithGeofenceWithNulls[index].motion.duration)
                            : dash}
                        </p>
                        <p className="m-0">
                          {activeConditionWith && ItemsWithGeofenceWithNulls[index].active.duration !== 0
                            ? showTimeInReports(ItemsWithGeofenceWithNulls[index].active.duration)
                            : dash}
                        </p>
                        <p className="m-0">
                          {onConditionWith && ItemsWithGeofenceWithNulls[index].on.duration !== 0
                            ? showTimeInReports(ItemsWithGeofenceWithNulls[index].on.duration)
                            : dash}
                        </p>
                      </td>
                      <td scope="col" className={highlightClassName}>
                        <p className="m-0">
                          {motionConditionWith && motionConditionWithout
                            ? ItemsWithoutGeofenceWithNulls[index].motion.count - ItemsWithGeofenceWithNulls[index].motion.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {activeConditionWith && activeConditionWithout
                            ? ItemsWithoutGeofenceWithNulls[index].active.count - ItemsWithGeofenceWithNulls[index].active.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {onConditionWith && onConditionWithout
                            ? ItemsWithoutGeofenceWithNulls[index].on.count - ItemsWithGeofenceWithNulls[index].on.count
                            : dash}
                        </p>
                      </td>
                      <td scope="col" className={highlightClassName}>
                        <p className="m-0">
                          {motionConditionWith && motionConditionWithout
                            ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].motion.duration - ItemsWithGeofenceWithNulls[index].motion.duration)
                            : dash}
                        </p>
                        <p className="m-0">
                          {activeConditionWith && activeConditionWithout
                            ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].active.duration - ItemsWithGeofenceWithNulls[index].active.duration)
                            : dash}
                        </p>
                        <p className="m-0">
                          {onConditionWith && onConditionWithout
                            ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].on.duration - ItemsWithGeofenceWithNulls[index].on.duration)
                            : dash}
                        </p>
                      </td>
                      <td scope="col" className={highlightClassName}>
                        <p className="m-0">
                          {motionConditionWith && ItemsWithGeofenceWithNulls[index].count !== null && ItemsWithGeofenceWithNulls[index].count !== 0
                            ? ItemsWithGeofenceWithNulls[index].count - ItemsWithGeofenceWithNulls[index].motion.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {activeConditionWith && ItemsWithGeofenceWithNulls[index].count !== null && ItemsWithGeofenceWithNulls[index].count !== 0
                            ? ItemsWithGeofenceWithNulls[index].count - ItemsWithGeofenceWithNulls[index].active.count
                            : dash}
                        </p>
                        <p className="m-0">
                          {onConditionWith && ItemsWithGeofenceWithNulls[index].count !== null && ItemsWithGeofenceWithNulls[index].count !== 0
                            ? ItemsWithGeofenceWithNulls[index].count - ItemsWithGeofenceWithNulls[index].on.count
                            : dash}
                        </p>
                      </td>
                    </tr>
                  }
                </Fragment>
              );
            })
            // Geofence not selected  
            : groupStatsItemsWithoutGeofence !== null && !_.isEmpty(groupStatsItemsWithoutGeofence)
              ? rangeFromTo.map((item, index) => {
                const highlightClassName = moment(item).day() === 6 || moment(item).day() === 0
                  ? "table-danger text-center"
                  : "text-center";
                const motionConditionWithout = ItemsWithoutGeofenceWithNulls[index].motion !== null;
                const activeConditionWithout = ItemsWithoutGeofenceWithNulls[index].active !== null;
                const onConditionWithout = ItemsWithoutGeofenceWithNulls[index].on !== null;
                return (
                  <Fragment>
                    {!showExtra
                      // Geofence not selected; showExtra === false
                      ? <tr key={Math.random() * rangeFromTo.length}>
                        <th scope="col" className={highlightClassName}>
                          {item.format("DD.MM.YYYY")}
                        </th>
                        <td scope="col" className={highlightClassName}>
                          {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].active.count !== 0
                            ? ItemsWithoutGeofenceWithNulls[index].active.count
                            : dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].active.duration !== 0
                            ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].active.duration)
                            : dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].count !== null
                            ? ItemsWithoutGeofenceWithNulls[index].count - ItemsWithoutGeofenceWithNulls[index].active.count
                            : dash}
                        </td>
                      </tr>
                      // Geofence not selected; showExtra === true
                      : <tr key={Math.random() * rangeFromTo.length}>
                        <th scope="col" className={highlightClassName}>
                          {item.format("DD.MM.YYYY")}
                        </th>
                        <td scope="col" className={highlightClassName}>
                          <p className="m-0">
                            {motionConditionWithout && ItemsWithoutGeofenceWithNulls[index].motion.count !== 0
                              ? ItemsWithoutGeofenceWithNulls[index].motion.count
                              : dash}
                          </p>
                          <p className="m-0">
                            {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].active.count !== 0
                              ? ItemsWithoutGeofenceWithNulls[index].active.count
                              : dash}
                          </p>
                          <p className="m-0">
                            {onConditionWithout && ItemsWithoutGeofenceWithNulls[index].on.count !== 0
                              ? ItemsWithoutGeofenceWithNulls[index].on.count
                              : dash}
                          </p>
                        </td>
                        <td scope="col" className={highlightClassName}>
                          <p className="m-0">
                            {motionConditionWithout && ItemsWithoutGeofenceWithNulls[index].motion.duration !== 0
                              ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].motion.duration)
                              : dash}
                          </p>
                          <p className="m-0">
                            {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].active.duration !== 0
                              ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].active.duration)
                              : dash}
                          </p>
                          <p className="m-0">
                            {onConditionWithout && ItemsWithoutGeofenceWithNulls[index].on.duration !== 0
                              ? showTimeInReports(ItemsWithoutGeofenceWithNulls[index].on.duration)
                              : dash}
                          </p>
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          {dash}
                        </td>
                        <td scope="col" className={highlightClassName}>
                          <p className="m-0">
                            {motionConditionWithout && ItemsWithoutGeofenceWithNulls[index].count !== null
                              ? ItemsWithoutGeofenceWithNulls[index].count - ItemsWithoutGeofenceWithNulls[index].motion.count
                              : dash}
                          </p>
                          <p className="m-0">
                            {activeConditionWithout && ItemsWithoutGeofenceWithNulls[index].count !== null
                              ? ItemsWithoutGeofenceWithNulls[index].count - ItemsWithoutGeofenceWithNulls[index].active.count
                              : dash}
                          </p>
                          <p className="m-0">
                            {onConditionWithout && ItemsWithoutGeofenceWithNulls[index].count !== null
                              ? ItemsWithoutGeofenceWithNulls[index].count - ItemsWithoutGeofenceWithNulls[index].on.count
                              : dash}
                          </p>
                        </td>
                      </tr>
                    }
                  </Fragment>
                );
              })
              : rangeFromTo.map((item, index) => {
                const highlightClassName = moment(item).day() === 6 || moment(item).day() === 0
                  ? "table-danger text-center"
                  : "text-center";
                return (
                  <tr key={Math.random() * rangeFromTo.length}>
                    <th scope="col" className={highlightClassName}>
                      {item.format("DD.MM.YYYY")}
                    </th>
                    <td scope="col" className={highlightClassName}>
                      {dash}
                    </td>
                    <td scope="col" className={highlightClassName}>
                      {dash}
                    </td>
                    <td scope="col" className={highlightClassName}>
                      {dash}
                    </td>
                    <td scope="col" className={highlightClassName}>
                      {dash}
                    </td>
                    <td scope="col" className={highlightClassName}>
                      {dash}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </Fragment>
  );
}
export default ReportActiveTable;
