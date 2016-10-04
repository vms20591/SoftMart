(function(){
  var app=angular.module('softMart.userControllers',['softMart.adsPostedControllers','softMart.cartControllers','softMart.userProfileControllers','softMart.myAdDetailsControllers']);

  app.controller('UserAccountController',['$scope','$ionicPlatform','SearchResultService','UserAccountService','CallbackService',function($scope,$ionicPlatform,SearchResultService,UserAccountService,CallbackService){
    $scope.adsInCart=[];
    $scope.adsPostedByUser=[];
    $scope.adsResponded=[];
    
    $ionicPlatform.ready(function(){
      UserAccountService.getAdsInCart().then(function(resp){
        $scope.adsInCart=resp;
      });
      
      UserAccountService.getAdsPostedByUser().then(function(ads){
        $scope.adsPostedByUser=ads;  
      });
      
      CallbackService.registerForAddItem('ads.add',function(eventName){
        $scope.refreshAdsAndCart(eventName);
      });
      
      CallbackService.registerForEditItem('ads.edit',function(eventName){
        $scope.refreshAdsAndCart(eventName);
      });
      
      CallbackService.registerForDeleteItem('ads.delete',function(eventName){
        $scope.refreshAdsAndCart(eventName);
      });
    });
    
    $scope.refreshAdsAndCart=function(eventName){
      if(eventName && eventName!=='ads.add'){
        UserAccountService.updateCart().then(function(resp){
          $scope.adsInCart=resp;
        });
      }
      
      UserAccountService.getAdsPostedByUser().then(function(ads){
        $scope.adsPostedByUser=ads;  
      });
    };
  }]);
})();
