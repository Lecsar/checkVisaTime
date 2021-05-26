import {RecordStatusEnum} from '../../src/enums';
import {getDateInfo} from '../../src/helpers/getDateInfo';
import {YearMonthDay} from '../../src/types';

describe('getDateInfo', () => {
  it('Возвращает информацию по дате со статусом "ошибка" при отстутсвии мапы свободных слотов', () => {
    expect(getDateInfo('2021-05-05' as YearMonthDay)).toEqual({
      date: '2021-05-05',
      status: RecordStatusEnum.ERROR,
      availableTime: [],
    });
  });

  it('Возвращает информацию по дате со статусом "нет записи" при пустой мапе свободных слотов', () => {
    expect(getDateInfo('2021-05-05' as YearMonthDay, {})).toEqual({
      date: '2021-05-05',
      status: RecordStatusEnum.NO_RECORD,
      availableTime: [],
    });
  });

  it('Возвращает информацию по дате со статусом "нет свободных слотов" при отсутствии свободных слотов', () => {
    expect(getDateInfo('2021-05-05' as YearMonthDay, {'10:00': true, '12:15': true})).toEqual({
      date: '2021-05-05',
      status: RecordStatusEnum.NO_AVAILABLE_SLOTS,
      availableTime: [],
    });
  });

  it('Возвращает информацию по дате со статусом "есть свободные слоты" и массивом слотов при наличии свободных слотов', () => {
    expect(getDateInfo('2021-05-05' as YearMonthDay, {'10:00': false, '12:15': true, '12:30': false})).toEqual({
      date: '2021-05-05',
      status: RecordStatusEnum.HAS_AVAILABLE_SLOTS,
      availableTime: ['10:00', '12:30'],
    });
  });
});
