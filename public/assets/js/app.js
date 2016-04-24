;(function(){
  'use strict'
  angular.module('roomieApp', ['ui.router','nouislider','ngMap','authService'])
          .config(uiRouterConfig, ['$stateProvider','$urlRouterProvider','$httpProvider'])

          function uiRouterConfig($stateProvider, $urlRouterProvider,  $httpProvider){
            $httpProvider.interceptors.push('AuthInterceptor')
            $stateProvider
            .state('search',{
              url        : '/search',
              templateUrl: 'assets/partials/search.html',
              controller : 'searchController as sc'
            })
            .state('home',{
              url        : '/home',
              templateUrl: 'assets/partials/home.html',
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
              controller : 'userController as uc'
            })
            $urlRouterProvider.otherwise('/home')
          }
}())
