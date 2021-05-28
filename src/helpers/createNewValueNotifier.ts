import deepEqual from 'deep-equal';

type TOnNewValue<T> = (value: T, prevValue: T | null) => void;

export function createNewValueNotifier<T>(onNewValue: TOnNewValue<T>): (value: T) => void;

export function createNewValueNotifier<T, K>(
  prepareValue: (value: T) => K,
  onNewValue: TOnNewValue<K>
): (value: T) => void;

export function createNewValueNotifier<T, K>(fn1: ((value: T) => K) | TOnNewValue<T | K>, fn2?: TOnNewValue<K>) {
  const prepareValue = (fn2 ? fn1 : undefined) as ((value: T) => K) | undefined;
  const onNewValue = (fn2 ? fn2 : fn1) as TOnNewValue<T | K>;

  let prevValue: T | K | null = null;

  return (value: T) => {
    const preparedValue = prepareValue ? prepareValue(value) : value;

    if (!deepEqual(prevValue, preparedValue)) {
      onNewValue(preparedValue, prevValue);
      prevValue = preparedValue;
    }
  };
}
