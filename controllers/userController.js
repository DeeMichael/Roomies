var User = require(__dirname + '/../models/user.js'),
       _ = require('underscore')


var userController = {
  // ---------------------------------------------------------------------------
  // responds: new user created in the database | used in user signup modal
  // ---------------------------------------------------------------------------
  create: function(req,res){
    var user = new User(req.body)
    user.save(function(err,user){
      if(err){
        console.log("!-- user route - db error: ", err)
        return res.json({"message": "user route: save error"})
      } else {
        console.log("-- user created. ")
        return res.json(user)
      }
    })
  }
}
