/*
  Ionic Soft Mart App
  --------------------
  
  angular.module is a global place for creating, registering and retrieving Angular modules.
  'softMart' is the name of this angular module and as well as the app example (also set in a <html> attribute in index.html)
  the 2nd parameter is an array of 'requires'
  
*/

/*
  Defining the main app module named "softMart" and mentioning all the modules required in an Array as the 2nd argument
  This makes sure that all dependencies are already injected and doesn't require checking in other modules and losing track
*/
var app=angular.module('softMart', ['ionic','ngCordova','softMart.pouchDbServices','softMart.deviceInformationService','softMart.initController','softMart.tabsControllers','softMart.tabsServices','softMart.adDetailsControllers','softMart.adDetailsServices','softMart.callbackServices','softMart.softMartFilters']);

/*
  Defining states and their transitions that form the heart of the application
*/
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  //Load the init page by default
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('init',{
    url:'/',
    templateUrl:'common/init.html',
    resolve:{
      dbInitialized:function(PouchDbService){
        return PouchDbService.initDb().then(function(resp){
          return resp;
        });
      }
    },
    controller:'InitController'
  }).state('ad-detail',{
    url:'/ad/:adId',
    templateUrl:'ads/ad-details.html',
    controller:'AdDetailsController'
  }).state('tabs',{
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
        templateUrl:'tabs/search/categories/search-categories.html',
        controller:'SearchCategoryController'
      }
    }
  }).state('tabs.search.home',{
      url:'/results/:category/:subCategory',
      cache:false,
    views:{
      'search-tab-home':{
        templateUrl:'tabs/search/results/search-results.html',
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
  }).state('tabs.my-cart',{
    url:'/cart',
    views:{
      'my-account-tab':{
        templateUrl:'tabs/user/cart/show-cart.html',
        controller:'AdsCartController'
      }
    }
  }).state('tabs.my-posted-ads',{
      url:'/posted-ads',
      views:{
        'my-account-tab':{
          templateUrl:'tabs/user/posted-ads/my-posted-ads.html',
          controller:'AdsPostedController'
        }
      }
  }).state('tabs.my-profile',{
      url:'/posted-ads',
      views:{
        'my-account-tab':{
          templateUrl:'tabs/user/user-profile/user-profile.html',
          controller:'UserProfileController'
        }
      }
  }).state('tabs.my-ad-detail',{
    url:'/ad/:adId',
    views:{
      'my-account-tab':{
        templateUrl:'tabs/user/ad-detail/my-ad-details.html',
        controller:'MyAdDetailsController'
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
