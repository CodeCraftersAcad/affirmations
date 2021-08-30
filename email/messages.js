const nodeMailer = require('nodemailer');
    const sendGridTransport = require('nodemailer-sendgrid-transport');
const { generateSignupEmailTemplate } = require('./templates');


const options = {
    auth: {
        api_key: process.env.SENDGRID_SECRET
    }
};
let mailer = nodeMailer.createTransport(sendGridTransport(options));

exports.sendSignupMessages = async (user) => {
    let messagesSent;
    try {
            let emailMessage = generateSignupEmailTemplate(user);
            let sendMessage = await mailer.sendMail(emailMessage, (err, res) => {
                if (err) {
                    return console.log(err)
                }
                else {
                    console.log(res)
                    return true
                }
            })
        console.log(sendMessage)
        return messagesSent = true;
    } catch (err) {
        console.log(err)
    }
};
