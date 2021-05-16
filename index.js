require('dotenv').config();

const apiGetTimeInformation = require('./apiGetTimeInformation');
const {EKATERINBURG, HAS_AVAILABLE_SLOTS} = require('./constants');

const getDateInfo = require('./helpers/getDateInfo');
const printDatesInfo = require('./helpers/printDatesInfo');

const INTERESTING_DATES = [
  '2021-05-27',
  '2021-05-28',
  '2021-05-29',
  '2021-05-30',
  '2021-05-31',
  '2021-06-01',
  '2021-06-02',
  '2021-06-03',
  '2021-06-04',
  '2021-06-05',
  '2021-06-06',
  '2021-06-07',
  '2021-06-08',
];

const promises = INTERESTING_DATES.map((date) =>
  apiGetTimeInformation(date, EKATERINBURG).then((timeMap) => {
    const dateInfo = getDateInfo(date, timeMap);
    return dateInfo;
  })
);

Promise.all(promises).then((datesInfo) => {
  //   printDatesInfo(datesInfo);

  const availableDatesArr = datesInfo.filter(({status}) => status === HAS_AVAILABLE_SLOTS);

  const availableDatesMap = availableDatesArr.reduce((acc, {date, availableTime}) => {
    acc[date] = availableTime;
    return acc;
  }, {});

  console.log(availableDatesMap);
});
