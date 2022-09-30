import _ from 'lodash';
import moment from 'moment-timezone';

const getProp = obj => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      getProp(obj[key]);
    } else {
      obj[key] = 0;
    }
  }
}

const instalNullVal = obj => {
  for (let key in obj) {
      obj[key] = null;
  }
}

export const newObjWithNulls = (obj) => {
  let newObj = _.cloneDeep(obj);
  instalNullVal(newObj);
  return newObj;
}

export const addNullsToItems = (items, range) => {
  let newArr = [];
  for (let i = 0; i < range.length; i++) {
    const obj = _.find(items, (item) => moment(item.from).format('D') === range[i].format('D'));
    (obj !== undefined) ? newArr.push(obj) : newArr.push(newObjWithNulls(items[0]));
  }
  return newArr;
}