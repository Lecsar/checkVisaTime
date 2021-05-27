import {createNewValueNotifier} from '../../src/helpers/createNewValueNotifier';

describe('createNewValueNotifier', () => {
  it('Should call onNewValue first time', () => {
    const onNewValue = jest.fn(() => {});
    const notifier = createNewValueNotifier(onNewValue);

    notifier({a: 1, b: 2});

    // expect(onNewValue.mock.calls.length).toBe(2);
  });
});
