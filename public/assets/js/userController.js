;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('userController', ['userFactory','$state','Auth' , userController])

  function userController(userFactory, $state, Auth){
    var uc = this

    uc.showProfile = true

    uc.editProfile = function(){
      uc.showProfile = false
    }
    uc.cancelUpdateProfile = function(){
      uc.showProfile = true
    }
    uc.updateProfile = function(){
      console.log("updateProfile Running")
      console.log(uc.loggedInUser.username)
      console.log(uc.updateUser)
      userFactory.updateOne(uc.loggedInUser.username,uc.updateUser)
        .then(function(res){
          console.log("updateOne user res is: ",res)
          uc.user = res.data
          uc.showProfile = true
        })
    }

    Auth.getUser()
    .then(function(response){
      uc.loggedInUser = response.data
      console.log("user-api/v1/me route",response)
      userFactory.getOne(uc.loggedInUser.username)
        .then(function(res){
          console.log("getOne res is: ",res)
          uc.user = res.data
          uc.updateUser = res.data
        })
    })



  }

}())
