;(function(){
  'use strict'
  angular.module('roomieApp', ['ui.router','nouislider','ngMap'])
          .config(uiRouterConfig, ['$stateProvider','$urlRouterProvider'])

          function uiRouterConfig($stateProvider, $urlRouterProvider){
            $stateProvider
            .state('search',{
              url        : '/search',
              templateUrl: 'assets/partials/search.html',
              controller : 'searchController as sc'
            })
            $stateProvider
            .state('about',{
              url        : '/about',
              templateUrl: 'assets/partials/about.html'
            })
            $stateProvider
            .state('contact',{
              url        : '/contact',
              templateUrl: 'assets/partials/contact.html'
            })
            .state('profile',{
              url        : '/profile',
              templateUrl: 'assets/partials/profile.html',
              controller : 'profileController as pc'
            })
            $urlRouterProvider.otherwise('/')
          }
}())
