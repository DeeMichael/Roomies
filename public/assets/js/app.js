;(function(){
  'use strict'
  angular.module('roomieApp', ['ui.router'])
          .config(uiRouterConfig, ['$stateProvider','$urlRouterProvider'])

          function uiRouterConfig($stateProvider, $urlRouterProvider){
            $stateProvider
            .state('home',{
              url        : '/home',
              templateUrl: 'assets/partials/home.html'
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
              templateUrl: 'assets/partials/profile.html'
            })
            $urlRouterProvider.otherwise('/')
          }
}())
