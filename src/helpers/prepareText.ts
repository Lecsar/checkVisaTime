import {IDayInfo} from '../types';

const MONTH_NAME_DICTIONARY: Record<string, string> = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
};

export const prepareText = (dayInfos: IDayInfo[]) => {
  let result = '';

  dayInfos.forEach(({date: dateTime, availableTime}) => {
    const [date] = dateTime.split('T');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, month, day] = date.split('-');

    result += `${day} ${MONTH_NAME_DICTIONARY[month]}`;
    result += `: ${availableTime.join(' ')}\n`;
  });

  return result;
};
