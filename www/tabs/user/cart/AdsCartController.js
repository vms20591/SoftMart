(function(){
  var app=angular.module('softMart.cartControllers',[]);

  app.controller('AdsCartController',['$scope','$state','$ionicPlatform','AdDetailService','UserAccountService',function($scope,$state,$ionicPlatform,AdDetailService,UserAccountService){
    $scope.cart;
    
    $ionicPlatform.ready(function(){
      UserAccountService.getAdsInCart().then(function(resp){
        $scope.cart=resp;
      });
    });
    
    $scope.showAdDetails=function(ad){
      AdDetailService.setCurrentAd(ad);

      $state.go('ad-detail',{adId:ad._id});
    };

    $scope.removeAdFromCart=function(ad){
      UserAccountService.removeAdFromCart(ad);
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
