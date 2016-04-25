var User = require(__dirname + '/../models/user.js'),
    _ = require('underscore'),
    jwt = require('jsonwebtoken'),
    twilioClient = require('../twilioClient'),
    mySpecialSecret = "boom"


var userController = {
    // ---------------------------------------------------------------------------
    // responds: new user created in the database | used in user signup modal
    // ---------------------------------------------------------------------------
    create: function(req, res) {
        var user = new User(req.body)
        user.save(function(err, user) {
            if (err) {
                console.log("!-- user route - db error: ", err)
                return res.json({
                    message: "user route: save error in create"
                })
            } else {
                console.log("-- user created. ")
                return res.json(user)
            }
        })
    },
    // ---------------------------------------------------------------------------
    //
    // ---------------------------------------------------------------------------
    sendMessage: function(req, res) {
      var user = req.decoded
      var newPatientAlert = function(user) {
       console.log('======SENDING ALERT======', user)
       if (user.rentee) {
         return ' Someone is interested in your room. Contact them here! Email:' + user.email + ' Phone: ' + user.phone + '. '
       } else {
         return ' Someone is interested in having you as a roommate. Contact them here! Email:' + user.email + ' Phone: ' + user.phone + '. '
       }
      }
      var messageToSend = newPatientAlert(user)
      twilioClient.sendSms('+13028249081', messageToSend)
      res.json({message:"message sent"})
    },
    // ---------------------------------------------------------------------------
    //
    // ---------------------------------------------------------------------------
    me: function(req,res){
      console.log("passed decoded info",req.decoded)
      res.json(req.decoded)
    },
    // ---------------------------------------------------------------------------
    //
    // ---------------------------------------------------------------------------
    authenticate: function(req, res, next) {
      console.log("Authentication Middleware Running.")
        // 1 - let's check everywhere for the user's token
        var token = req.body.token || req.params.token || req.headers['x-access-token']
            // 2 - If we find a token, we will use mySpecialSecret to try and decode it
            //      - if it can't be decoded, send the user an error that they don't have the right token
        if (token) {
            jwt.verify(token, mySpecialSecret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                            success: false,
                            message: "can't authenticate token"
                        })
                        //      - if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            // 3 - If we can't find a token at all, we'll just send back an error message
            return res.status(403).send({
                success: false,
                message: "no token provided"
            })
        }
    },

    // ---------------------------------------------------------------------------
    // responds: array of users that according to search params | used in search partial
    // ---------------------------------------------------------------------------
    search: function(req, res) {
        User.find({
            age: {
                $gte: req.body.minAge,
                $lte: req.body.maxAge
            },
            pricemax: {
                $lte: req.body.priceMax
            },
            gender: req.body.gender,
            smokes: req.body.smokes
        }, function(err, users) {
            if (err) {
                console.log("!-- search route - db error: ", err)
                return res.json({
                    message: "search route: find error in search"
                })
            } else {
                console.log("-- search ran succesfully. ")
                return res.json(users)
            }
        })
    },
    // ---------------------------------------------------------------------------
    // responds: user object |
    // ---------------------------------------------------------------------------
    login: function(req, res) {
        var userParams = req.body
        User.findOne({
            username: userParams.username
        }, function(err, user) {
            if (err) {
                console.log("!-- login route - db error: ", err)
                return res.json({
                    message: "login route: findOne error in login"
                })
            } else {
                if (user.passCheck(userParams.password)) {
                    console.log("-- login route - Valid Credentials. ")
                    var token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        rentee: user.rentee,
                        address: user.address
                    }, mySpecialSecret, {
                        expiresInMinutes: 1440
                    })
                    return res.json({
                        success: true,
                        message: 'You got a token!',
                        token: token
                    })
                } else {
                    console.log("-- login route - Invalid Credentials. ")
                    return res.json({
                        message: "login route: Invalid Credentials. "
                    })
                }
            }
        })
    },
    // ---------------------------------------------------------------------------
    // responds: array of all users in the database |
    // ---------------------------------------------------------------------------
    getAll: function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                console.log("!-- user route - db error: ", err)
                return res.json({
                    message: "user route: find error in getAll"
                })
            } else {
                console.log("-- found all. ")
                return res.json(users)
            }
        })
    },
    // ---------------------------------------------------------------------------
    // responds: one user in the database |
    // ---------------------------------------------------------------------------
    getSingle: function(req, res) {
        var username = req.params.username
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                console.log("!-- user/:id route - db error: ", err)
                 res.json({
                    message: "user route: findOne error in getSingle"
                })
            } else {
                console.log("-- found single. ")
                 res.json(user)
            }
        })
    },
    // ---------------------------------------------------------------------------
    // responds: one user that has been updated in the database |
    // ---------------------------------------------------------------------------
    update: function(req, res) {
        var username = req.params.username
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                console.log("!-- user/:id route - db error: ", err)
                return res.json({
                    message: "user/:id route: findOne error"
                })
            } else {
                if (req.body.username) { user.username = req.body.username }
                // if (req.body.password) { user.password = req.body.password }
                if (req.body.rentee) { user.rentee = req.body.rentee }
                if (req.body.firstname) { user.firstname = req.body.firstname }
                if (req.body.lastname) { user.lastname = req.body.lastname }
                if (req.body.phone) { user.phone = req.body.phone }
                if (req.body.email) { user.email = req.body.email }
                if (req.body.about) { user.about = req.body.about }
                if (req.body.pricemin) { user.pricemin = req.body.pricemin }
                if (req.body.pricemax) { user.pricemax = req.body.pricemax }
                if (req.body.available) { user.available = req.body.available }
                if (req.body.age) { user.age = req.body.age }
                if (req.body.smokes) { user.smokes = req.body.smokes }
                if (req.body.image) { user.image = req.body.image }
                if (req.body.gender) { user.gender = req.body.gender }
                if (req.body.friends) { user.friends = req.body.friends }
                if (req.body.address) { user.address = req.body.address }
                if (req.body.location) { user.location = req.body.location }
                if (req.body.rentee) { user.rentee = req.body.rentee }
                user.save(function(err, u) {
                    if (err) {
                        console.log("!-- user/:id route - db error: ", err)
                        return res.json({
                            message: "user/:id route: save error"
                        })
                    } else {
                        console.log("-- updated user. ")
                        return res.json(u)
                    }
                })
            }
        })
    },
    // ---------------------------------------------------------------------------
    // responds: message that user has been deleted |
    // ---------------------------------------------------------------------------
    destroy: function(req, res) {
        var id = req.params.id
        User.remove({
            _id: id
        }, function(err) {
            if (err) {
                console.log("!-- user/:id route - db error: ", err)
                return res.json({
                    message: "user/:id route: remove error"
                })
            } else {
                console.log("-- removed user. ")
                return res.json({
                    message: "-- user deleted."
                })
            }
        })
    }
}

module.exports = userController
