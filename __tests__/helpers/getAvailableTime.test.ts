import {getAvailableTime} from '../../src/helpers/getAvailableTime';

describe('getAvailableTime', () => {
  it('Возвращает массив доступных временных слотов (true - время занято)', () => {
    expect(getAvailableTime({'09:00': true, '10:00': false, '11:22': true, '12:15': false})).toEqual([
      '10:00',
      '12:15',
    ]);
  });
});
