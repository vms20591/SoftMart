(function(){
  var app=angular.module('softMart.userControllers',[]);

  app.controller('UserAccountController',['$scope','$ionicPlatform','SearchHomeService','UserAccountService',function($scope,$ionicPlatform,SearchHomeService,UserAccountService){
    $scope.itemsInCart=0;
    $scope.adsPostedByUserLength=0;
    
    $ionicPlatform.ready(function(){
      $scope.itemsInCart=SearchHomeService.getLengthOfCart();
      UserAccountService.getAdsPostedByUserLength().then(function(length){
        $scope.adsPostedByUserLength=length;  
      });
    });

    $scope.doRefresh=function(){
      $scope.itemsInCart=SearchHomeService.getLengthOfCart();

      $scope.$broadcast('scroll.refreshComplete');
    };
  }]);

  app.controller('AdsCartController',['$scope','$state','ProductDetailService','SearchHomeService',function($scope,$state,ProductDetailService,SearchHomeService){
    $scope.cart=SearchHomeService.getProductsInCart();

    $scope.showProductDetails=function(item){
      ProductDetailService.setCurrentProduct(item);

      $state.go('tabs.product-detail',{productId:item.id});
    };

    $scope.removeFromCart=function(index){
      SearchHomeService.removeFromCart(index);
    };
  }]);

  app.controller('AdsPostedController',['$scope','$ionicPlatform','UserAccountService',function($scope,$ionicPlatform,UserAccountService){
    $scope.adsPosted=[];

    $ionicPlatform.ready(function(){
      UserAccountService.getAdsPostedByUser().then(function(ads){
        $scope.adsPosted=ads;
      });
    });
    
  }]);
})();
