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
    (daysInfo: IDayInfo[]) => daysInfo.filter((i) => i.status === RecordStatusEnum.HAS_AVAILABLE_SLOTS),
    (availableDatesArr) => {
      const hasAvailableDates = availableDatesArr.length > 0;

      if (hasAvailableDates) {
        const message = `${city}:\n${prepareText(availableDatesArr)}`;
        notifyAllMembers(SUBSRIBED_CHAT_IDS, message);
      }
    }
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
      intervalMin: 5,
    });
  });
};
