import { push } from 'connected-react-router';
import _ from 'lodash';
import moment from 'moment-timezone';

const newNullItemsArray = (items) => {
  let newArr = [];
  for (const [key, value] of Object.entries(items)) {
    let newObj = _.cloneDeep(value);
    newObj.motionDuration = null;
    newObj.activeDuration = null;
    newObj.onDuration = null;
    newArr.push(newObj);
  }
  return newArr;
}

export const addNullsToItems = (items, range) => {
  let newArr = [];
  for (let i = 0; i < range.length; i++) {
    const obj = _.find(items, (item) => moment(item.from).format('D') === range[i].format('D') && moment(item.from).format('M') === range[i].format('M'));
    (obj !== undefined) ? newArr.push(obj) : newArr.push({ items: newNullItemsArray(items[0].items), from: moment(range[i]).format('YYYY-MM-DD') });
  }
  return newArr;
}

export const colWithTotalDuration = (arr, count) => {
  let objectOfDurations = {};
  for (let k=0; k < 3; k++) {
    let arrayOfTotalDuration = [];
    let res = 0;
    let cur = 0;
    for (let i = 0; i < count; i++) {
      res = arr.reduce((sum, current) => {
        switch (k) {
          case 0:
            cur = current.items[i].motionDuration;
            return sum + cur;
            break;
          case 1:
            cur = current.items[i].activeDuration;
            return sum + cur;
            break;
          case 2:
            cur = current.items[i].onDuration;
            return sum + cur;
            break;
        }
      }, 0)
      arrayOfTotalDuration.push(res);
    }
    objectOfDurations[k] = arrayOfTotalDuration;
  }
  return objectOfDurations;
}

export const showTimeInReports = (duration) => {
  const time = moment.duration(duration, 'seconds');
  return Math.floor(time.asHours()) + ':' + (time.minutes() < 10 ? '0' + time.minutes() : time.minutes());
}

export const showAllTimesInReports = (motion, active, on) => {
  const arrTimes = [];
  arrTimes.push(showTimeInReports(motion));
  arrTimes.push(showTimeInReports(active));
  arrTimes.push(showTimeInReports(on));
  return arrTimes;
}
