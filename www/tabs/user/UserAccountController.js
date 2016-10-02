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
      
      CallbackService.registerForAddItem('ads.add',function(){
        $scope.refreshAdsAndCart();
      });
      
      CallbackService.registerForEditItem('ads.edit',function(){
        $scope.refreshAdsAndCart();
      });
      
      CallbackService.registerForDeleteItem('ads.delete',function(){
        $scope.refreshAdsAndCart();
      });
    });
    
    $scope.refreshAdsAndCart=function(){
      UserAccountService.updateCart().then(function(resp){
        $scope.adsInCart=resp;
      });
      
      UserAccountService.getAdsPostedByUser().then(function(ads){
        $scope.adsPostedByUser=ads;  
      });
    };
  }]);
})();
