require('dotenv').config();

const checkAvailableVisaDates = require('./checkAvailableVisaDates');
const {MOSCOW} = require('./constants');

const INTERESTING_DATES = [
  '2021-05-24',
  '2021-05-25',
  '2021-05-26',
  '2021-05-27',
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
];

const CHECKING_INERVAL = 5;

checkAvailableVisaDates(INTERESTING_DATES, MOSCOW, CHECKING_INERVAL);
