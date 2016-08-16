// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('softMart', ['ionic','softMart.controllers'])

app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/tabs/home');

  $stateProvider.state('tabs',{
    url:'/tabs',
    abstract:true,
    templateUrl:'templates/tabs.html'
  }).state('tabs.home',{
    url:'/home',
    cache:false,
    views:{
      'home-tab':{
        templateUrl:'templates/home-tab.html',
        controller:'HomeTabController'
      }
    }
  }).state('tabs.search',{
    url:'/search',
    views:{
      'search-tab':{
        templateUrl:'templates/search-tab.html',
        controller:'SearchTabController'
      }
    }
  }).state('tabs.post-ad',{
    url:'/post-ad',
    views:{
      'post-ad-tab':{
        templateUrl:'templates/post-ad-tab.html',
        controller:'PostAdTabController'
      }
    }
  }).state('tabs.my-account',{
    url:'/my-account',
    views:{
      'my-account-tab':{
        templateUrl:'templates/my-account-tab.html',
        controller:'MyAccountTabController'
      }
    }
  });
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
