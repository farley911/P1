'use strict'
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
  });

exports.sendMail = function(to, from, subject, html, next) {
	transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  }, next);
};

exports.renderIndex = function(req, res) {
  res.render('index.html');
};

exports.getEnv = function(req, res) {
  var env = process.env.NODE_ENV;
  res.json({ env: env });
};