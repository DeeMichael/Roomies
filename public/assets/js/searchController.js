;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory', searchController])

  function searchController(userFactory){
    var sc = this

    sc.searchParams = {}
    sc.searchParams.minAge = 16
    sc.searchParams.maxAge = 120

    sc.search = function(){
      userFactory.search(sc.searchParams)
                .then(function(res){
                  console.log("res.data from search is: ", res.data)
                  sc.searchResults = res.data
                })
    }
  }

}())
