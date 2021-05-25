import {IApiResult, IDayInfo, YearMonthDay} from './types';
import {RecordStatusEnum} from './enums';

import {getDateInfo} from './helpers/getDateInfo';

interface IParams {
  dates: YearMonthDay[];
  intervalMin?: number;
  apiGetDayInfo: (date: YearMonthDay) => Promise<IApiResult>;
  onNotify: (dayInfos: IDayInfo[]) => void;
}

let couldMakeRequest = true;
let timerID: NodeJS.Timeout | null = null;

export const getAvailableDatesWithTime = ({dates, intervalMin = 5, apiGetDayInfo, onNotify}: IParams) => {
  const checkInfo = () => {
    if (!couldMakeRequest) {
      if (timerID) {
        clearInterval(timerID);
        timerID = null;
      }

      return;
    }

    const promises = dates.map((date) =>
      apiGetDayInfo(date).then(({hasError, timeMap}) => {
        if (hasError) {
          couldMakeRequest = false;
          return;
        }

        const dateInfo = getDateInfo(date, timeMap);
        return dateInfo;
      })
    );

    Promise.all(promises).then((daysInfo) => {
      if (!couldMakeRequest) {
        return;
      }

      onNotify(daysInfo.filter(Boolean).map((i) => i!));
    });
  };

  //   выполняем сразу
  checkInfo();
  // встаем на цикл
  timerID = setInterval(checkInfo, intervalMin * 1000 * 60);
};
