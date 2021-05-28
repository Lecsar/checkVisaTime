import {IApiResult, IDayInfo, YearMonthDay} from './types';

import {getDateInfo} from './helpers/getDateInfo';
import {createSubscribtion} from './helpers/createSubscribtion';

interface IParams {
  dates: YearMonthDay[];
  intervalMin?: number;
  apiGetDayInfo: (date: YearMonthDay) => Promise<IApiResult>;
  onNotify: (dayInfos: IDayInfo[]) => void;
}

export const getAvailableDatesWithTime = ({dates, intervalMin = 5, apiGetDayInfo, onNotify}: IParams) => {
  const checkInfo = () => {
    const promises = dates.map((date) =>
      apiGetDayInfo(date).then(({hasError, timeMap}) => {
        if (hasError) {
          return Promise.reject(`Error on ${date}`);
        }

        const dateInfo = getDateInfo(date, timeMap);
        return dateInfo;
      })
    );

    return Promise.all(promises).then(onNotify);
  };

  createSubscribtion(checkInfo, intervalMin * 1000 * 60);
};
