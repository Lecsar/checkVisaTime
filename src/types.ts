import {RecordStatusEnum} from './enums';

declare const uniqueTimeSymbol: unique symbol;

/** Время вида: "09:00" */
export type Time = string & {
  [uniqueTimeSymbol]: true;
};

declare const uniqueYearMonthDaySymbol: unique symbol;

/** Дата вида: "2021-05-24" */
export type YearMonthDay = string & {
  [uniqueYearMonthDaySymbol]: true;
};

export type TTimeMap = Record<Time, boolean>;

export interface IDayInfo {
  date: YearMonthDay;
  status: RecordStatusEnum;
  availableTime: Time[];
}
