;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory','NgMap',searchController])

  function searchController(userFactory, NgMap){
    var sc = this

    sc.searchParams = {}
    sc.searchParams.minAge = 16
    sc.searchParams.maxAge = 120

    sc.markers = []

    sc.search = function(){
      userFactory.search(sc.searchParams)
                .then(function(res){
                  sc.searchResults = res.data
                  sc.markers = []
                  for (var i = 0; i < sc.searchResults.length; i++) {
                    var address = sc.searchResults[i].address.street + ", " + sc.searchResults[i].address.city + ", " + sc.searchResults[i].address.zip
                    sc.markers.push(address)
                  }
                })
    }
  }

}())
