import deepEqual from 'deep-equal';

import {apiGetTimeInformation} from './apiGetTimeInformation';
import {IDayInfo, YearMonthDay} from './types';
import {AvailableCitiesEnum, RecordStatusEnum} from './enums';
import {notifyAllMembers} from './notifyAllMembers';

import {prepareText} from './helpers/prepareText';
import {getDateInfo} from './helpers/getDateInfo';

let prevValue: IDayInfo[] = [];
let couldMakeRequest = true;
let timerID: NodeJS.Timeout | null = null;

export const checkAvailableVisaDates = (dates: YearMonthDay[], city: AvailableCitiesEnum, intervalMinutes: number) => {
  const checkInfo = () => {
    if (!couldMakeRequest) {
      if (timerID) {
        clearInterval(timerID);
        timerID = null;
      }

      return;
    }

    const promises = dates.map((date) =>
      apiGetTimeInformation(date, city).then(({hasError, timeMap}) => {
        if (hasError) {
          couldMakeRequest = false;
          return;
        }

        const dateInfo = getDateInfo(date, timeMap);
        return dateInfo;
      })
    );

    Promise.all(promises).then((datesInfo) => {
      if (!couldMakeRequest) {
        return;
      }

      const availableDatesArr = datesInfo
        .filter((i) => i?.status === RecordStatusEnum.HAS_AVAILABLE_SLOTS)
        .map((i) => i!);

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
