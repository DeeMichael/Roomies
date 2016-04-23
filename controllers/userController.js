var User = require(__dirname + '/../models/user.js'),
       _ = require('underscore')


var userController = {
  // ---------------------------------------------------------------------------
  // responds: new user created in the database | used in user signup modal
  // ---------------------------------------------------------------------------
  create: function(req,res){
    var user = new User(req.body)
    console.log("req.body is : ", req.body)
    user.save(function(err,user){
      if(err){
        console.log("!-- user route - db error: ", err)
        return res.json({message: "user route: save error in create"})
      } else {
        console.log("-- user created. ")
        return res.json(user)
      }
    })
  },
  // ---------------------------------------------------------------------------
  // responds: user object |
  // ---------------------------------------------------------------------------
  login: function(req,res){
    var userParams = req.body
    User.findOne({username:userParams.username}, function(err,user){
      if (err) {
        console.log("!-- login route - db error: ", err)
        return res.json({message: "login route: findOne error in login"})
      }else {
        user.passCheck(userParams.password, function (err, isMatch){
          if(err){
            console.log("!-- login route - db error: ", err)
            return res.json({message: "login route: passCheck error in login"})
          }
          if (isMatch) {
            console.log("-- login route - Valid Credentials. ")
            return res.json(user)
          }else {
            console.log("-- login route - Invalid Credentials. ")
            return res.json({message: "login route: Invalid Credentials. "})
          }
        })
      }
    })
  },
  // ---------------------------------------------------------------------------
  // responds: array of all users in the database |
  // ---------------------------------------------------------------------------
  getAll: function(req,res){
    User.find({}, function(err, users){
      if (err) {
        console.log("!-- user route - db error: ", err)
        return res.json({message:"user route: find error in getAll"})
      }else {
        console.log("-- found all. ")
        return res.json(users)
      }
    })
  },
  // ---------------------------------------------------------------------------
  // responds: one user in the database |
  // ---------------------------------------------------------------------------
  getSingle: function(req,res){
    var id = req.params.id
    User.findOne({_id: id}, function(err, user){
      if (err) {
        console.log("!-- user/:id route - db error: ", err)
        return res.json({message:"user route: findOne error in getSingle"})
      }else {
        console.log("-- found single. ")
        return res.json(user)
      }
    })
  },
  // ---------------------------------------------------------------------------
  // responds: one user that has been updated in the database |
  // ---------------------------------------------------------------------------
  update: function(req,res){
    var id = req.params.id
    User.findOne({_id:id}, function(err, user){
      if (err) {
        console.log("!-- user/:id route - db error: ", err)
        return res.json({message:"user/:id route: findOne error"})
      }else {
        if(req.body.username) {user.username  = req.body.username}
        if(req.body.password) {user.password  = req.body.password}
        if(req.body.firstname){user.firstname = req.body.firstname}
        if(req.body.lastname) {user.lastname  = req.body.lastname}
        if(req.body.phone)    {user.phone     = req.body.phone}
        if(req.body.email)    {user.email     = req.body.email}
        if(req.body.about)    {user.about     = req.body.about}
        if(req.body.pricemin) {user.pricemin  = req.body.pricemin}
        if(req.body.pricemax) {user.pricemax  = req.body.pricemax}
        if(req.body.available){user.available = req.body.available}
        if(req.body.age)      {user.age       = req.body.age}
        if(req.body.smokes)   {user.smokes    = req.body.smokes}
        if(req.body.image)    {user.image     = req.body.image}
        if(req.body.gender)   {user.gender    = req.body.gender}
        if(req.body.friends)  {user.friends   = req.body.friends}
        if(req.body.address)  {user.address   = req.body.address}
        user.save(function(err, u){
          if (err) {
            console.log("!-- user/:id route - db error: ", err)
            return res.json({message:"user/:id route: save error"})
          }else {
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
  destroy: function(req,res){
      var id = req.params.id
      User.remove({_id:id}, function(err){
        if (err) {
          console.log("!-- user/:id route - db error: ", err)
          return res.json({message:"user/:id route: remove error"})
        }else {
          console.log("-- removed user. ")
          return res.json({message:"-- user deleted."})
        }
      })
  }
}

module.exports = userController
