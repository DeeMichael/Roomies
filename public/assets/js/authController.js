;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('authController', ['Auth','AuthToken','$state','$rootScope',authController])

  function authController(Auth,AuthToken,$state,$rootScope){
    var ac = this

    ac.isLoggedIn = Auth.isLoggedIn()

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
      $('#logInModal').removeClass('fade')
      $('#logInModal').modal('hide')
      console.log("doLogin:==============")
        Auth.login(ac.loginUser.username,ac.loginUser.password)
          .then(function(response){
            AuthToken.setToken(response.data.token)
            console.log("response from server",response)
            $state.go('search')
          })
    }

    ac.doLogout = function() {
        ac.loginUser.username = ""
        ac.loginUser.password = ""
        Auth.logout()
        $state.go('home')
    }

  }

}())
