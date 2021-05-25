import fetch from 'node-fetch';

import {getNowTime} from './helpers/getNowTime';
import {AvailableCitiesEnum} from './enums';
import {TTimeMap, YearMonthDay} from './types';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const TOKEN = process.env.TOKEN || '';

interface IResponseData {
  mapData: TTimeMap;
}

interface IResult {
  hasError: boolean;
  timeMap: TTimeMap;
}

export const apiGetTimeInformation = (date: YearMonthDay, city: AvailableCitiesEnum): Promise<IResult> =>
  fetch(`https://ru-gr.gvcworld.eu/proxy/vac/${city}/date/getValidHours/${date}/1`, {
    method: 'POST',
    body: `"${getNowTime()}"`,
    headers: {
      Authentication: TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
  })
    .then((res) => res.json())
    .then((data: IResponseData) => {
      if (data && 'mapData' in data) {
        return {hasError: false, timeMap: data.mapData};
      }

      return {hasError: true, timeMap: {}};
    })
    .catch((err) => {
      console.error('Ошибка при запросе');
      console.error(err);

      return Promise.resolve({hasError: true, timeMap: {}});
    });
