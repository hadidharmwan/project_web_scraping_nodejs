const cheerio = require('cheerio');
const nodemailer = require('node-mailer');
const fetch = require('node-fetch');

const cnn = 'https://lite.cnn.com/en';
const string = 'Biden';

function getFromCNN(resp) {
    fetch(cnn).then(res => res.text()).then((html) => { resp(html);})
};

function getLastestHeadline(data) {
    const $ = cheerio.load(data);

    let Titles = [];
    $('ul').children('li').each(function(i, el){
        Titles.push({title : $(el).text(), link : $(el).children('a').attr('href')})
    })
    return Titles[0];   
}

// setInterval(() => {getFromCNN((data) => {
//     const lastestHeadline = getLastestHeadline(data);
//     if(lastestHeadline.title.includes(string)){
//          console.log('Biden article released!');
//         }

//     // console.log(lastestHeadline);
// })},5 * 1000);

function compare() {
    getFromCNN((data) => {
        let previousHeadline = getLastestHeadline(data)
        console.log(previousHeadline)
        setTimeout(() => {
            getFromCNN((data) => {
                let newestHeadline = getLastestHeadline(data);
                if(newestHeadline.title !== previousHeadline.title) {
                    console.log('New article found!');
                    console.log(newestHeadline)
                    if(newestHeadline.title.includes(string)) {
                        console.log('Biden post found');
                    }
                }
            })
        }, 2 * 1000)
    })
}
setInterval(compare, 10 * 1000);