var mongoose = require('mongoose'),
      bcrypt = require('bcryptjs')
      Schema = require('mongoose').Schema

userSchema = new Schema({
  username  : {type:String, required:true, unique:true},
  password  : {type:String, required:true},
  firstname : {type:String, required:true},
  lastname  : {type:String, required:true},
  phone     : {type:String, required:true},
  email     : {type:String, required:true},
  about     : {type:String},
  address   : {
                street : {type:String},
                city   : {type:String},
                zip    : {type:String}
              },
  pricemin  : {type:Number},
  pricemax  : {type:Number},
  available : {type:String},
  age       : {type:Number},
  smokes    : {type:String},
  image     : {},
  gender    : {type:String},
  friends   : [{type: Schema.Types.ObjectId, ref: 'user'}]
})

userSchema.pre('save', function(next){
  var user = this
  if (!user.isModified('password')) return next()
  user.password = bcrypt.hashSync(user.password, 8)
  next()
})

userSchema.methods.passCheck = function(password, callback){
  bcrypt.compare(password,this.password, function(err,isMatch){
    callback(null,isMatch)
  })
}

module.exports = mongoose.model('user', userSchema)
