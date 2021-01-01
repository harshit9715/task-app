const ses = require('node-ses')

const {SES_API_KEY, SES_API_SECRET, EMAIL_SENDER, SES_REGION, MAILING_ENABLED} = require('../config')

const client = ses.createClient({key: SES_API_KEY, secret: SES_API_SECRET, amazon: `https://email.${SES_REGION}.amazonaws.com`});

const sendWelcomeEmail = (email, name) => {
    MAILING_ENABLED === 'true' && email != EMAIL_SENDER && client.sendEmail({
        from: EMAIL_SENDER,
        replyTo: EMAIL_SENDER,
        to: email,
        subject: 'Thanks for joining in!',
        message: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    },function (err, data, res) {
        if (err) {
            console.log(err)
        }
        // console.log(data)
    })
}

const sendGoodbyeEmail = (email, name) => {
    MAILING_ENABLED === 'true'&& email != EMAIL_SENDER && client.sendEmail({
        from: EMAIL_SENDER,
        replyTo: EMAIL_SENDER,
        to: email,
        subject: 'Sorry to see you go!',
        message: `Goodbye ${name}. Let us know what we could have improved on.`
    },function (err, data, res) {
        if (err) {
            console.log(err)
        }
        // console.log(data)
    })
}

module.exports ={
    sendWelcomeEmail,
    sendGoodbyeEmail
}