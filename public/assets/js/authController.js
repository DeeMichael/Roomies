;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('authController', ['Auth','AuthToken','$state','$rootScope','userFactory',authController])

  function authController(Auth,AuthToken,$state,$rootScope,userFactory){
    var ac = this

    ac.isLoggedIn = Auth.isLoggedIn()

    $rootScope.$on('$stateChangeSuccess', function(){
      console.log("=========STATE CHANGE=========")
      ac.isLoggedIn = Auth.isLoggedIn()
      if(ac.isLoggedIn){
        Auth.getUser()
        .then(function(response){
          ac.loggedInUser = response.data
          console.log("user-api/v1/me route",response)
        })
      }else{
        $state.go('home')
      }
    })

    ac.submitNewUser = function(){
      userFactory.signup(ac.newUser)
              .then(function(res){
                ac.user = res.data
                ac.showLogin = false
                ac.showLogout = true
              })
    }

    ac.loginSubmit = function(){
      $('#logInModal').removeClass('fade')
      $('#logInModal').modal('hide')
      console.log("doLogin:==============")
        Auth.login(ac.loginUser.username,ac.loginUser.password)
          .then(function(response){
            AuthToken.setToken(response.data.token)
            console.log("response from server",response)
            $state.go('profile')
          })
          ac.loginUser.username = ""
          ac.loginUser.password = ""
    }

    ac.doLogout = function() {
        Auth.logout()
        $state.go('home')
    }

  }

}())
