const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const {
    generateSignupEmailTemplate,
    generateAffirmationEmail,
    generatePasswordResetEmailTemplate,
    generateUserUpdatedEmailTemplate,
    generateUserDeleteAccountEmailTemplate
} = require('./templates');


const options = {
    auth: {
        api_key: process.env.SENDGRID_SECRET
    }
};
let mailer = nodeMailer.createTransport(sendGridTransport(options));

exports.sendSignupMessages = async (user) => {

    // Check if user is wanting email affirmations as well. Maybe we only send this one after sign up. Talk about it another day.
    user.notifications.email && await this.sendEmailAffirmation(user.email)

    try {
        let emailMessage = generateSignupEmailTemplate(user);
        await mailer.sendMail(emailMessage, (err, res) => {
            if (err) {
                return console.log(err)
            } else {
                console.log(res)
                return true
            }
        })
    } catch (err) {
        console.log(err)
    }
};

exports.sendEmailAffirmation = async (email) => {
    try {
        let emailMessage = generateAffirmationEmail(email);
        await mailer.sendMail(emailMessage, (err, res) => {
            if (err) {
                return console.log(err)
            } else {
                console.log(res)
                return true
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.sendPasswordResetEmail = async (user) => {
    try {
        let emailMessage = generatePasswordResetEmailTemplate(user);
        await mailer.sendMail(emailMessage, (err, res) => {
            if (err) {
                console.log(err)
                return err
            } else {
                console.log(res)
                return {msg: 'This email has been sent'}
            }
        })
    } catch (err) {
        console.log(err)
    }
};

exports.sendUserUpdatedEmail = async (user) => {
    console.log(user)
    try {
        let emailMessage = generateUserUpdatedEmailTemplate(user);
        await mailer.sendMail(emailMessage, (err, res) => {
            if (err) {
                console.log(err)
                return err
            } else {
                console.log(res)
                return {msg: 'This email has been sent'}
            }
        })
    } catch (err) {
        console.log(err)
    }
};

exports.sendUserAccountDeleteEmail = async (user) => {
    console.log(user)
    try {
        let emailMessage = generateUserDeleteAccountEmailTemplate(user);
        await mailer.sendMail(emailMessage, (err, res) => {
            if (err) {
                console.log(err)
                return err
            } else {
                console.log(res)
                return {msg: 'This email has been sent'}
            }
        })
    } catch (err) {
        console.log(err)
    }
};