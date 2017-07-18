'use strict';

const http = require('http');
const URL = 'http://qiita.com/kazuhikoyamashita/items/273692ccbdf8c0950a71.json';

http.get(URL, (res) => {
  let body = '';
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', (res) => {
    res = JSON.parse(body);
    console.log(res);
  });
}).on('error', (e) => {
  console.log(e.message);
});