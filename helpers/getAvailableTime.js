const getAvailableTime = (timeMap) => Object.keys(timeMap).filter((time) => !timeMap[time]);

module.exports = getAvailableTime;
