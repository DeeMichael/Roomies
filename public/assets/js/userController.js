;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('userController', ['userFactory','ngMessages', userController])

  function userController(userFactory){
    var uc = this
    uc.user


  }

}())
