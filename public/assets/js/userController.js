;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('userController', ['userFactory','$state','Auth' , userController])

  function userController(userFactory, $state, Auth){
    var uc = this

    Auth.getUser()
    .then(function(response){
      uc.loggedInUser = response.data
      console.log("user-api/v1/me route",response)
      userFactory.getOne(uc.loggedInUser.username)
        .then(function(res){
          console.log("getOne res is: ",res)
          uc.user = res.data
        })
    })


  }

}())
