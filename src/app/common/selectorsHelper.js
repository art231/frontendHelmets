import _ from 'lodash';

export const listHelmetsSortByIncreaseSerial = (arr) => _.orderBy(arr, 'attributes.serial', 'asc');

export const helmetsDictSortByIncreaseSerial = (obj) => _.orderBy(Object.values(obj), 'serial', 'asc');

export const itemsSortByIncreaseSerial = (arr) => {
  let newArr = [];
  for (const [key, value] of Object.entries(arr)) {
    let newObj = _.cloneDeep(value);
    newObj.items = _.orderBy(value.items, 'serial', 'asc');
    newArr.push(newObj);
  }
  return newArr;
}

export const listCompaniesWithRoleId3 = (arr) => arr.filter(item => item.roleId === 3);

export const sliceArr = (arr, start, end) =>_.slice(arr, start, end);

export const deleteNull = (obj) => {
  let newObj = JSON.parse(JSON.stringify(obj));
  return delete newObj[0] ? newObj : null;
}

export const getNull = (obj) => {
  let newObj = JSON.parse(JSON.stringify(obj));
  return newObj[0];
}