(function(){
  var app=angular.module('softMart.searchResultControllers',[]);

  app.controller('SearchResultController',['$scope','$timeout','$stateParams',function($scope,$timeout,$stateParams){
    $scope.products=[1,2,3,4,5];
    
    $scope.showProductsByOptions=[
      {
        name:"Low Price",
        id:"1"
      },
      {
        name:"High Price",
        id:"2"
      },
      {
        name:"Popularity",
        id:"3"
      }
    ];

    $scope.showProductsBy=$scope.showProductsByOptions[0];

    $scope.showProductsByUpdate=function(){
      $scope.show();
      $timeout(function(){
        $scope.hide();
      },2000);
    };

    $scope.addToCart=function(){
      $scope.showAlert({
        title: 'Add to Cart',
        template: 'Product added to Cart'
      });
      console.log('Added to cart');
    };

    $scope.loadMore=function(){
      $scope.show();
      for(var i=0;i<5;i++){
        $scope.products.push(i*Math.random()*$scope.products.length);
      }
      $timeout(function(){
        $scope.hide();
      },2000);
    };
  }]);
})();
