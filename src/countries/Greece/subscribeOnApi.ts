import {getAvailableDatesWithTime} from '../../getAvailableDatesWithTime';
import {IDayInfo, YearMonthDay} from '../../types';

import {notifyAllMembers} from '../../messenger';
import {apiGetGreeceDayInfo, TGreeceAvailableCityName} from './api';

import {prepareText} from '../../helpers/prepareText';
import {RecordStatusEnum} from '../../enums';
import {createNewValueNotifier} from '../../helpers/createNewValueNotifier';

const SUBSRIBED_CHAT_IDS = (process.env.SUBSRIBED_CHAT_IDS || '').split(';');

const createNotifier = (city: string) =>
  createNewValueNotifier(
    (availableDatesArr) => {
      const message = `${city}:\n${prepareText(availableDatesArr)}`;
      notifyAllMembers(SUBSRIBED_CHAT_IDS, message);
    },
    (daysInfo: IDayInfo[]) => daysInfo.filter((i) => i.status === RecordStatusEnum.HAS_AVAILABLE_SLOTS)
  );

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
