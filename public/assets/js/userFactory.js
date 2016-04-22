;(function(){
  'use strict'
  angular.module('roomieApp')
          .factory('userFactory', ['$http', userFactory])

  function userFactory($http){
    var uf = {}

    uf.signup = function(user){
      return $http.post('/user-api/v1/user',user)
    }
    uf.login = function(nameAndPass){
      return $http.post('/user-api/v1/login',nameAndPass)
    }

    return uf
  }
}())
