const addZero = (number) => (number >= 10 ? String(number) : `0${number}`);

const getNowTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = addZero(now.getMonth() + 1);
  const day = addZero(now.getDate());

  const hours = addZero(now.getHours());
  const minutes = addZero(now.getMinutes());
  const seconds = addZero(now.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

module.exports = getNowTime;
