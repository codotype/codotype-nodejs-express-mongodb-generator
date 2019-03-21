// Mailgun.js configuration
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// // // //

// dispatch
// Dispatches an email via MailGun
function dispatch ({ sender, recipient, subject, text }) {

  // Build email
  const dispatch = {
    from: sender,
    to: recipient,
    subject: subject,
    text: text
  };

  // Send mailgun dispatch
  mailgun.messages()
  .send(dispatch, function (error, body) {
    // TODO - update logging here
    console.log(`Dispatched email to ${recipient} via MailGun`);
  });
}

module.exports = {
  dispatch
}
