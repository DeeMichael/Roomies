;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory', searchController])

  function searchController(userFactory){
    var sc = this
    sc.from = 0
    sc.to = 100
  }

}())
