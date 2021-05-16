const {ERROR, NO_RECORD, NO_AVAILABLE_SLOTS, HAS_AVAILABLE_SLOTS} = require('../constants');

const printDatesInfo = (datesInfo) => {
  datesInfo.forEach(({date, status, availableTime}) => {
    switch (status) {
      case ERROR:
        console.log(`${date}: Ошибка`);
        break;
      case NO_RECORD:
        console.log(`${date}: Нет записи`);
        break;
      case NO_AVAILABLE_SLOTS:
        console.log(`${date}: Нет доступных слотов`);
        break;
      case HAS_AVAILABLE_SLOTS:
        console.log(`${date}: Доступные слоты ${availableTime.join(' ')}`);
        break;
      default:
        console.log(`${date}: Неизвестный статус`);
        break;
    }
  });
};

module.exports = printDatesInfo;
