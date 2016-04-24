var client = require('twilio')('ACca474c87b477f9ad62a5e60ae2737b40', '5a882bff02401ccb3dd7283a492dbe94')

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
