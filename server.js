var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
path = require('path');


var app = express();
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/wedding');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));


var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "gabmimouni@gmail.com",
        pass: "manchester777"
    }
});


app.get('/', function(req, res) {
    res.sendfile(process.env.CONNECTION_STRING || "mongodb://localhost/wedding/sendmail.html");
});
app.get('/sendmail', function(req, res) {
    var mailOptions = {
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
    // res.end("sent");
});



app.listen(process.env.PORT || '8080');
// app.listen('8000', function(){
//  console.log("yallah")
// });
