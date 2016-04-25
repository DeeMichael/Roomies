;(function(){
  'use strict'
  angular.module('roomieApp')
          .controller('searchController', ['userFactory','NgMap','Auth',searchController])

  function searchController(userFactory, NgMap, Auth){
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
                    sc.searchResults[i].markerPosition = sc.searchResults[i].address.street + ", " + sc.searchResults[i].address.city + ", " + sc.searchResults[i].address.zip
                  }
                })
    }

    Auth.getUser()
    .then(function(response){
      sc.loggedInUser = response.data
      userFactory.getOne(sc.loggedInUser.username)
        .then(function(res){
          sc.user = res.data
          console.log("sc.user is: ", sc.user)
        })
    })

    sc.sendMessage = function(){
      userFactory.sendText()
    }

    NgMap.getMap().then(function(map) {
          sc.showCustomMarker= function(evt,username) {
            map.customMarkers[username].setVisible(true)
            map.customMarkers[username].setPosition(this.getPosition())
          }
          sc.closeCustomMarker= function(evt,username) {
            map.customMarkers[username].setVisible(false)
          }
        })


  }

}())



























//
