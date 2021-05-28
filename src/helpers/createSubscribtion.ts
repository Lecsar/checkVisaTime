export const createSubscribtion = (fn: () => Promise<any>, interval: number) => {
  let timerID: NodeJS.Timeout | null = null;
  let hasError = false;

  const wrapper = () => {
    if (hasError && timerID) {
      clearInterval(timerID);
      timerID = null;

      return;
    }

    try {
      fn().catch((error) => {
        console.error(error);
        hasError = true;
      });
    } catch (error) {
      console.error(error);
      hasError = true;
    }
  };

  wrapper();
  timerID = setInterval(wrapper, interval);
};
