const prepareText = (availableDatesArr) => {
  let result = '';

  availableDatesArr.forEach(({date: dateTime, availableTime}) => {
    const [date] = dateTime.split('T');
    const [_, month, day] = date.split('-');

    if (month === '05') {
      result += `${day} мая`;
    }

    if (month === '06') {
      result += `${day} июня`;
    }

    result += `: ${availableTime.join(' ')}\n`;
  });

  return result;
};

module.exports = prepareText;
