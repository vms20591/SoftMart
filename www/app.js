// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('softMart', ['ionic','softMart.tabsControllers','softMart.tabsServices']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/tabs/home');

  $stateProvider.state('tabs',{
    url:'/tabs',
    abstract:true,
    templateUrl:'tabs/tabs.html',
    controller:'TabsController'
  }).state('tabs.home',{
    url:'/home',
    cache:false,
    views:{
      'home-tab':{
        templateUrl:'tabs/home/home-tab.html',
        controller:'HomeController'
      }
    }
  }).state('tabs.search',{
    url:'/search',
    abstract:true,
    views:{
      'search-tab':{
        templateUrl:'tabs/search/search-tab-base.html',
      }
    },
  }).state('tabs.search.category',{
    url:'/category',
    views:{
      'search-tab-home':{
        templateUrl:'tabs/search/categories/search-tab.html',
        controller:'SearchCategoryController'
      }
    }
  }).state('tabs.search.home',{
    url:'/home',
    views:{
      'search-tab-home':{
        templateUrl:'tabs/search/results//search-tab-home.html',
        controller:'SearchResultController'
      }
    }
  }).state('tabs.post-ad',{
    url:'/post-ad',
    views:{
      'post-ad-tab':{
        templateUrl:'tabs/post-ad/post-ad-tab.html',
        controller:'PostAdController'
      }
    }
  }).state('tabs.my-account',{
    url:'/my-account',
    views:{
      'my-account-tab':{
        templateUrl:'tabs/user/my-account-tab.html',
        controller:'UserAccountController'
      }
    }
  });
}]);

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
