import {RecordStatusEnum} from '../enums';
import {IDayInfo} from '../types';

export const printDatesInfo = (dayInfos: IDayInfo[]) => {
  dayInfos.forEach(({date, status, availableTime}) => {
    switch (status) {
      case RecordStatusEnum.ERROR:
        console.log(`${date}: Ошибка`);
        break;
      case RecordStatusEnum.NO_RECORD:
        console.log(`${date}: Нет записи`);
        break;
      case RecordStatusEnum.NO_AVAILABLE_SLOTS:
        console.log(`${date}: Нет доступных слотов`);
        break;
      case RecordStatusEnum.HAS_AVAILABLE_SLOTS:
        console.log(`${date}: Доступные слоты ${availableTime.join(' ')}`);
        break;
      default:
        console.log(`${date}: Неизвестный статус`);
        break;
    }
  });
};
