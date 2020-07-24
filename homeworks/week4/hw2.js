const request = require('request');

const args = process.argv;
const url = 'https://lidemy-book-store.herokuapp.com';

const action = args[2];
const params = args[3];

function listBooks() {
  request(`${url}/books?_limit=20`, (err, res, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    const data = JSON.parse(body);
    for (let i = 0; i < data.length; i += 1) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
    return '錯誤';
  });
}
function readBook(idRead) {
  request(`${url}/books/${idRead}`, (err, res, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    const data = JSON.parse(body);
    return console.log(data);
  });
}
function deleteBook(idDelete) {
  request.delete(`${url}/books/${idDelete}`, (err) => {
    if (err) {
      return console.log('刪除失敗');
    }
    return console.log('刪除成功');
  });
}
function createBook(nameCreate) {
  request.post({
    url: `${url}/books`,
    form: { nameCreate },
  }, (err) => {
    if (err) {
      return console.log('新增失敗', err);
    }
    return console.log('新增成功！');
  });
}
function updateBook(idUpdate, nameUpdate) {
  request.patch({
    url: `${url}/books/${idUpdate}`,
    form: { nameUpdate },
  }, (err) => {
    if (err) {
      return console.log('更新失敗', err);
    }
    return console.log('更新成功！');
  });
}
switch (action) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    deleteBook(params);
    break;
  case 'create':
    createBook(params);
    break;
  case 'update':
    updateBook(params, args[4]);
    break;
  default:
    console.log('Available commands: list, read, delete, create and update');
}

/* eslint linebreak-style: ["error", "windows"] */
