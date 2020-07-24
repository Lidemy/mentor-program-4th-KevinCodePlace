const request = require('request');

const clientID = '698a4q3m3cfh5k18xtvgx3xfo894iz';
const topGameURL = 'https://api.twitch.tv/kraken/games/top';

request({
  method: 'GET',
  url: `${topGameURL}`,
  headers: {
    'Client-ID': clientID,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
}, (err, res, body) => {
  if (err) {
    return console.log('抓取失敗', err);
  }
  const data = JSON.parse(body);
  for (let i = 0; i < data.top.length; i += 1) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`);
  }
  return true;
});
/* eslint linebreak-style: ["error", "windows"] */
