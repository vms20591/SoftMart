(function(){
  var app=angular.module('softMart.adsPostedControllers',[]);
  
  app.controller('AdsPostedController',['$scope','$state','$ionicPlatform','UserAccountService','MyAdDetailService','PostAdService',function($scope,$state,$ionicPlatform,UserAccountService,MyAdDetailService,PostAdService){
    $scope.adsPosted=[];

    $ionicPlatform.ready(function(){
      UserAccountService.getAdsPostedByUser().then(function(ads){
        $scope.adsPosted=ads;
      });
    });
    
    $scope.showAdDetails=function(ad){
      MyAdDetailService.setCurrentAd(ad);

      $state.go('tabs.my-ad-detail',{adId:ad._id});
    };
    
    $scope.deletePostedAd=function(ad,index){
      PostAdService.deletePostedAd(ad).then(function(){
        $scope.adsPosted.splice(index,1);
      });
    };
    
    $scope.getDefaultImage=function(ad){
      var returnValue='assets/img/noicon.svg';
      
      angular.forEach(ad._attachments,function(value,key){
        if(key===ad.defaultImg){
          returnValue=value.src;
        }
      });

      return returnValue;
    };
  }]);
})();
