;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('authController', ['Auth','AuthToken','$state','$rootScope',authController])

  function authController(Auth,AuthToken,$state,$rootscope){
    var ac = this
    $rootScope.$on('$stateChangeSuccess', function(){
      console.log("=========STATE CHANGE=========")
      ac.isLoggedIn = Auth.isLoggedIn()
      if(ac.isLoggedIn){
        Auth.getUser()
        .then(function(response){
          ac.loggedInUser =  response.data
          console.log("user-api/v1/me route",response)
        })
      }else{
        $state.go('home')
      }
    })
    ac.loginSubmit = function(){
      console.log("doLogin:==============")
      console.log(ac.loginUser)
        Auth.login(ac.loginUser.username,ac.loginUser.password)
          .then(function(response){
            AuthToken.setToken(response.data.token)
            console.log("response from server",response)
            $state.go('search')
          })
    }
    ac.doLogout = function() {
        Auth.logout()
        $state.go('home')
    }

  }

}())
