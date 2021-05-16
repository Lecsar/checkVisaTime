const {ERROR, NO_RECORD, NO_AVAILABLE_SLOTS, HAS_AVAILABLE_SLOTS} = require('../constants');

const getAvailableTime = require('./getAvailableTime');

const getDateInfo = (date, timeMap) => {
  if (!timeMap) {
    return {date, status: ERROR};
  }

  if (Object.keys(timeMap).length === 0) {
    return {date, status: NO_RECORD};
  }

  const availableTime = getAvailableTime(timeMap);

  return {
    date,
    status: availableTime.length > 0 ? HAS_AVAILABLE_SLOTS : NO_AVAILABLE_SLOTS,
    availableTime,
  };
};

module.exports = getDateInfo;
