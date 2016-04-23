;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory','NgMap',searchController])

  function searchController(userFactory, NgMap){
    var sc = this

    sc.searchParams = {}
    sc.searchParams.minAge = 16
    sc.searchParams.maxAge = 120

    sc.markers = [
      "1431 Clayton Street, Wilmington DE",
      "214 Potomac Rd, Wilmington DE",
      "46 Garvey Ln, Newark DE"
    ]

    sc.search = function(){
      userFactory.search(sc.searchParams)
                .then(function(res){
                  sc.searchResults = res.data
                })
    }
  }

}())
