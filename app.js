const cheerio = require('cheerio');
const nodemailer = require('node-mailer');
const fetch = require('node-fetch');

const cnn = 'https://lite.cnn.com/en';
const string = 'Trump';

function getFromCNN(resp) {
    fetch(cnn).then(res => res.text()).then((html) => { resp(html);})
};

