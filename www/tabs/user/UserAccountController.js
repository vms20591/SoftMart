(function(){
  var app=angular.module('softMart.userControllers',[]);

  app.controller('UserAccountController',['$scope','SearchHomeService',function($scope,SearchHomeService){
    $scope.itemsInCart=SearchHomeService.getLengthOfCart();

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
})();
