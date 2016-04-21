var mongoose = require('mongoose'),
      Schema = require('mongoose').Schema

userSchema = new Shema({
  username  : {type:String, required:true},
  password  : {type:String, required:true},
  firstname : {type:String, required:true},
  lastname  : {type:String, required:true},
  phone     : {type:String, required:true},
  email     : {type:String, required:true},
  address   : {
                street : {type:String, required:true},
                city   : {type:String, required:true},
                zip    : {type:String, required:true}
              },
  pricemin  : {type:Number},
  pricemax  : {type:Number},
  available : {type:String},
  age       : {type:Number},
  smokes    : {type:String},
  image     : {},
  gender    : {type:String}
})

module.exports = mongoose.model('user', userSchema)
