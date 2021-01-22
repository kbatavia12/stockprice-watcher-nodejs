const XRay = require('x-ray');
var x = XRay();
const nodemailer = require('nodemailer');
const creds = require('./cred.json');

async function sendMail(stockPrice) {
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: creds.username,
            pass: creds.pass,
    }});

    let info = await transporter.sendMail({
        from: creds.username,
        to: creds.sendMail,
        subject: "Stock News",
        text: `Your stock hit the benchmark of ${stockPrice}!!!`
    });

    console.log("Message sent");

}

const checkThreshold = priceCheck => {
    x('https://www.moneycontrol.com/india/stockpricequote/auto-lcvshcvs/eichermotors/EM', '#nsecp@rel')((err, price) => {
        if (price >= priceCheck) {
            sendMail(parseFloat(price));
        } else {
            console.log("NOT HIT YET");
        }
    });
}

setInterval(() => {
    checkThreshold(2971);
}, 3600000);








