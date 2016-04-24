var twilioConfig = require('./config')

var client = require('twilio')(twilioConfig.accountSid, twilioConfig.accountToken)

module.exports.sendSms = function(to, message) {
    console.log('======SENDING SMS TO====', to)
    client.messages.create({
        body: message,
        to: to,
        from: '+14847023510'
    }, function(err, data) {
        if (err) {
            console.error('Could not notify administrator')
            console.error(err)
        } else {
            console.log('Administrator notified')
        }
    })
}
