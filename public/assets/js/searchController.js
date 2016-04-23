;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory', searchController])

  function searchController(userFactory){
    var sc = this
    sc.minAge = 16
    sc.maxAge = 120
  }

}())
