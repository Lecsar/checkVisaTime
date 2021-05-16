const deepEqual = require('deep-equal');

const apiGetTimeInformation = require('./apiGetTimeInformation');
const notifyAllMembers = require('./notifyAllMembers');
const {HAS_AVAILABLE_SLOTS} = require('./constants');

const getDateInfo = require('./helpers/getDateInfo');
const prepareText = require('./helpers/prepareText');

let prevValue = [];
let couldMakeRequest = true;
let timerID = null;

const checkAvailableVisaDates = (dates, city, intervalMinutes) => {
  const checkInfo = () => {
    if (!couldMakeRequest) {
      if (timerID) {
        clearInterval(timerID);
        timerID = null;
      }

      return;
    }

    const promises = dates.map((date) =>
      apiGetTimeInformation(date, city)
        .then((timeMap) => {
          const dateInfo = getDateInfo(date, timeMap);
          return dateInfo;
        })
        .catch(() => {
          couldMakeRequest = false;
        })
    );

    Promise.all(promises).then((datesInfo) => {
      if (!couldMakeRequest) {
        return;
      }

      const availableDatesArr = datesInfo.filter(({status}) => status === HAS_AVAILABLE_SLOTS);

      if (availableDatesArr.length > 0 && !deepEqual(prevValue, availableDatesArr)) {
        prevValue = availableDatesArr;

        const message = prepareText(availableDatesArr);
        notifyAllMembers(message);
      }
    });
  };

  //   выполняем сразу
  checkInfo();
  // встаем на цикл
  timerID = setInterval(checkInfo, intervalMinutes * 1000 * 60);
};

module.exports = checkAvailableVisaDates;
