const nodemailer = require("nodemailer");


//  nedd to enable allow less ecure app from your google account
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahhar848@gmail.com',
    pass: 'sagar4852&'
  }
});

module.exports = transporter;
