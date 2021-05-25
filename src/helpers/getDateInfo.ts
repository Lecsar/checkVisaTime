import {IDayInfo, TTimeMap, YearMonthDay} from '../types';
import {RecordStatusEnum} from '../enums';

import {getAvailableTime} from './getAvailableTime';

export const getDateInfo = (date: YearMonthDay, timeMap: TTimeMap): IDayInfo => {
  if (!timeMap) {
    return {date, status: RecordStatusEnum.ERROR, availableTime: []};
  }

  if (Object.keys(timeMap).length === 0) {
    return {date, status: RecordStatusEnum.NO_RECORD, availableTime: []};
  }

  const availableTime = getAvailableTime(timeMap);

  return {
    date,
    status: availableTime.length > 0 ? RecordStatusEnum.HAS_AVAILABLE_SLOTS : RecordStatusEnum.NO_AVAILABLE_SLOTS,
    availableTime,
  };
};
