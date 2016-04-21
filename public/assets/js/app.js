;(function(){
  'use strict'
  angular.module('roomieApp', ['ui.router'])
          .config(uiRouterConfig, ['$stateProvider','$urlRouterProvider'])

          function uiRouterConfig($stateProvider, $urlRouterProvider){
            $stateProvider
            .state('home',{
              url        : '/',
              templateUrl: 'assets/partials/home.html'
            })
            $stateProvider
            .state('about',{
              url        : '/',
              templateUrl: 'assets/partials/about.html'
            })
            $stateProvider
            .state('contact',{
              url        : '/',
              templateUrl: 'assets/partials/contact.html'
            })
            $urlRouterProvider.otherwise('/')
          }
}())
