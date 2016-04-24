;(function () {
  'use strict'
  angular.module('authService', [])
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('AuthToken', AuthToken)

  function Auth ($http, $q, AuthToken) {
    var authFactory = {}

    authFactory.login = function(username, password){
      return $http.post('/user-api/v1/login', {username: username, password: password})
    }
    authFactory.logout = function(){
      AuthToken.setToken()
    }
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken()){
        return true
      }else{
        return false
      }
    }
    authFactory.getUser = function(){
      if(AuthToken.getToken()){
        return $http.get('/user-api/v1/me')
      }else{
        return $q.reject({message: 'User has no token'})
      }
    }
    return authFactory
  }

  function AuthToken ($window) {
    var authTokenFactory = {}

    authTokenFactory.getToken = function () {
      return $window.localStorage.getItem('token')
    }

    authTokenFactory.setToken = function (token) {
      if (token)
      {
        $window.localStorage.setItem('token', token)
      }
      else
      {
        $window.localStorage.removeItem('token')
      }
    }
    return authTokenFactory
  }

  function AuthInterceptor ($q, AuthToken,$location) {
    console.log("AuthInterceptor Running")
    var interceptorFactory = {}

    interceptorFactory.request = function(config){
      var token = AuthToken.getToken()
      if(token){
        config.headers['x-access-token'] = token
      }
      return config
    }
    interceptorFactory.responseError = function(response){
      console.log("Server Error")
        $location.path('/')
        return $q.reject(response)
    }
    return interceptorFactory
  }

}())
