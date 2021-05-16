process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fetch = require('node-fetch');
const getNowTime = require('./helpers/getNowTime');

const TOKEN = process.env.TOKEN;

const apiGetTimeInformation = (date, city) =>
  fetch(`https://ru-gr.gvcworld.eu/proxy/vac/${city}/date/getValidHours/${date}/1`, {
    method: 'POST',
    body: `"${getNowTime()}"`,
    headers: {
      Authentication: TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && 'mapData' in data) {
        return data.mapData;
      }

      return null;
    })
    .catch((err) => {
      console.error('Ошибка при запросе');
      console.error(err);

      return null;
    });

module.exports = apiGetTimeInformation;
