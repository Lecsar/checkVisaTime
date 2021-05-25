import deepEqual from 'deep-equal';

import {getAvailableDatesWithTime} from '../../getAvailableDatesWithTime';
import {IDayInfo, YearMonthDay} from '../../types';

import {notifyAllMembers} from '../../messenger';
import {apiGetGreeceDayInfo, TGreeceAvailableCityName} from './api';

import {prepareText} from '../../helpers/prepareText';
import {RecordStatusEnum} from '../../enums';

const SUBSRIBED_CHAT_IDS = (process.env.SUBSRIBED_CHAT_IDS || '').split(';');

const createNotifier = (city: string) => {
  let prevValue: IDayInfo[] = [];

  return (daysInfo: IDayInfo[]) => {
    const availableDatesArr = daysInfo.filter((i) => i.status === RecordStatusEnum.HAS_AVAILABLE_SLOTS);

    if (availableDatesArr.length > 0 && !deepEqual(prevValue, availableDatesArr)) {
      prevValue = availableDatesArr;

      const message = `${city}:\n${prepareText(availableDatesArr)}`;
      notifyAllMembers(SUBSRIBED_CHAT_IDS, message);
    }
  };
};

export const subscribeOnApi = (
  dates: YearMonthDay[],
  cities: TGreeceAvailableCityName[] = ['MOSCOW', 'EKATERINBURG']
) => {
  cities.forEach((city) => {
    getAvailableDatesWithTime({
      dates,
      apiGetDayInfo: (date) => apiGetGreeceDayInfo(date, city),
      onNotify: createNotifier(city),
      intervalMin: 0.1,
    });
  });
};
