import deepEqual from 'deep-equal';

export function createNewValueNotifier<T>(onNewValue: (value: T) => void): (value: T) => void;

export function createNewValueNotifier<T, K>(
  onNewValue: (newValue: K) => void,
  prepareValue: (value: T) => K
): (value: T) => void;

export function createNewValueNotifier<T, K>(onNewValue: (newValue: T | K) => void, prepareValue?: (value: T) => K) {
  let prevValue: T | K | null = null;

  return (value: T) => {
    const preparedValue = prepareValue ? prepareValue(value) : value;

    if (!deepEqual(prevValue, preparedValue)) {
      prevValue = preparedValue;
      onNewValue(preparedValue);
    }
  };
}
