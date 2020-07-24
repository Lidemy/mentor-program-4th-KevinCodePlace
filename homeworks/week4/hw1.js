const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com';
request(`${url}/books?_limit=10`, (err, res, body) => {
  if (err) {
    console.log('抓取失敗', err);
    return;
  }
  let data;
  try {
    data = JSON.parse(body);
  } catch (error) {
    console.log(error);
    return;
  }
  for (let i = 0; i < data.length; i += 1) {
    console.log(`${data[i].id} ${data[i].name}`);
  }
});
/* eslint linebreak-style: ["error", "windows"] */
