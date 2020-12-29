const sgMail = require('@sendgrid/mail')

const SG_API_KEY = process.env.SG_API_KEY || ''
const mail_sender = process.env.EMAIL_SENDER || 'harshit9715@gmail.com'
sgMail.setApiKey(SG_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: mail_sender,
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        from: mail_sender,
        to: email,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. Let us know what we could have improved on.`
    })
}

module.exports ={
    sendWelcomeEmail,
    sendGoodbyeEmail
}