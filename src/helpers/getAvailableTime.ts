import {Time, TTimeMap} from '../types';
import {getKeys} from './getKeys';

export const getAvailableTime = (timeMap: TTimeMap) =>
  getKeys(timeMap).filter((time: Time) => !(timeMap as Record<string, boolean>)[time]);
