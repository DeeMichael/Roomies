;(function(){
  'use strict'
  angular.module('roomieApp')
          .factory('userFactory', ['$http', userFactory])

  function userFactory($http){
    var uf = {}

    uf.signup = function(user){
      return $http.post('/user-api/v1/user',user)
    }
    uf.search = function(searchParams){
      return $http.post('/user-api/v1/search',searchParams)
    }
    uf.getOne = function(username){
      return $http.get('/user-api/v1/user/' + username)
    }


    return uf
  }
}())
