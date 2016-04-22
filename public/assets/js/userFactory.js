;(function(){
  'use strict'
  angular.module('roomieApp')
          .factory('userFactory', ['$http', userFactory])

  function userFactory($http){
    var uf = {}

    uf.user = {}
    uf.signup = function(user){
      return $http.post('/user-api/v1/user',user)
                  .then(function(res){
                    uf.user = res.data
                    return uf.user
                  })
    }
    
  }
})
