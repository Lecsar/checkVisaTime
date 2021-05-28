import {createNewValueNotifier} from '../../src/helpers/createNewValueNotifier';

describe('createNewValueNotifier', () => {
  it('Should call onNewValue only one time with the same value', () => {
    const onNewValue = jest.fn();
    const notifier = createNewValueNotifier(onNewValue);
    const value = {a: 1, b: 2};

    notifier(value);
    notifier(value);
    notifier(value);

    expect(onNewValue.mock.calls.length).toBe(1);
    expect(onNewValue.mock.calls[0][0]).toEqual({a: 1, b: 2});
  });

  it('Should call onNewValue 3 times with different values', () => {
    const onNewValue = jest.fn();
    const notifier = createNewValueNotifier(onNewValue);

    notifier({a: 1});
    notifier({a: 2});
    notifier({a: 3});

    expect(onNewValue.mock.calls.length).toBe(3);
    expect(onNewValue.mock.calls[0][0]).toEqual({a: 1});
    expect(onNewValue.mock.calls[1][0]).toEqual({a: 2});
    expect(onNewValue.mock.calls[2][0]).toEqual({a: 3});
  });

  it('Should call onNewValue 2 times with different values and same values', () => {
    const onNewValue = jest.fn();
    const notifier = createNewValueNotifier(onNewValue);

    notifier({a: 1});
    notifier({a: 1});
    notifier({a: 3});

    expect(onNewValue.mock.calls.length).toBe(2);
    expect(onNewValue.mock.calls[0][0]).toEqual({a: 1});
    expect(onNewValue.mock.calls[1][0]).toEqual({a: 3});
  });

  it('Should call onNewValue 2 times with different values and same values (with prepareValue)', () => {
    const onNewValue = jest.fn();
    const prepareValue = jest.fn((arr: number[]) => arr.map((x) => x + 1));
    const notifier = createNewValueNotifier(prepareValue, onNewValue);

    notifier([1, 2, 3]);
    notifier([1, 2, 3]);
    notifier([2, 3, 4]);

    expect(onNewValue.mock.calls.length).toBe(2);
    expect(onNewValue.mock.calls[0][0]).toEqual([2, 3, 4]);
    expect(onNewValue.mock.calls[1][0]).toEqual([3, 4, 5]);
  });
});
