;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('userController', ['userFactory', userController])

  function userController(userFactory){
    var uc = this
    uc.submitNewUser = function(){
      console.log("submitting new user ", uc.newUser)
      userFactory.signup(uc.newUser)
              .then(function(res){
              console.log("res.data is : ", res.data)
      })
    }
  }

}())

// uc.suUsername
// uc.suPassword
// uc.suFirstname
// uc.suLastname
// uc.suPhone
// uc.suEmail
// uc.suAbout
// uc.suStreet
// uc.suCity
// uc.suZip
// uc.suPricemin
// uc.suPricemax
// uc.suAvailable
// uc.suAge
// uc.suSmokes
// uc.suImage = ""
// uc.suGender
// uc.suFriends =[]



//
//
// userSchema = new Schema({
//   username  : {type:String, required:true},
//   password  : {type:String, required:true},
//   firstname : {type:String, required:true},
//   lastname  : {type:String, required:true},
//   phone     : {type:String, required:true},
//   email     : {type:String, required:true},
//   about     : {type:String},
//   address   : {
//                 street : {type:String, required:true},
//                 city   : {type:String, required:true},
//                 zip    : {type:String, required:true}
//               },
//   pricemin  : {type:Number},
//   pricemax  : {type:Number},
//   available : {type:String},
//   age       : {type:Number},
//   smokes    : {type:String},
//   image     : {},
//   gender    : {type:String},
//   friends   : [{type: Schema.Types.ObjectId, ref: 'user'}]
// })
