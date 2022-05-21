const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const apiKey='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'
const sendgridMail = require('@sendgrid/mail');
sendgridMail.setApiKey(apiKey);


router.post('/createEmployee', (req, res) => {//actual login functionality is not created this is only for testing
    const employee = new Employee();
    employee.fullName = req.body.name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.password ='123456789'//in a reallife scenario i would use passport policy here and and hash the password before storing them in db;
    employee.city=req.body.city;
    employee.save((err, doc) => {
        if (!err){
            sendgridMail.send(
                {
                  to: req.body.email,
                  from:'silverfulbuster1496@gmail.com',
                  subject: 'Please activate your account',
                  html: `user this password to login 123456789`//an html template can be rendered
                }
              ).then(() => {
                console.log('mail sent success: ');
              }).catch(err => {
                console.log('mail send error: ', err);
              });
            res.send(doc);

        }
        else {
            res.status(400).send(err);
                console.log('Error during record insertion : ' + err);
        }
    });
});

module.exports = router;