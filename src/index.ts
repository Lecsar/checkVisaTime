import dotenv from 'dotenv';
dotenv.config();

import {YearMonthDay} from './types';

import {subscribeOnGreeceApi} from './countries/Greece';

subscribeOnGreeceApi(
  [
    '2021-05-28',
    '2021-05-29',
    '2021-05-30',
    '2021-05-31',
    '2021-06-01',
    '2021-06-02',
    '2021-06-03',
    '2021-06-04',
    '2021-06-05',
    '2021-06-06',
    '2021-06-07',
    '2021-06-08',
    '2021-06-09',
    '2021-06-10',
    '2021-06-11',
    '2021-06-12',
    '2021-06-13',
    '2021-06-14',
  ] as YearMonthDay[],
  ['EKATERINBURG', 'MOSCOW']
);
