(function(){
  var app=angular.module('softMart.searchResultControllers',[]);

  app.controller('SearchResultController',['$scope','$timeout','$state','$stateParams','SearchHomeService','ProductDetailService',function($scope,$timeout,$state,$stateParams,SearchHomeService,ProductDetailService){

    $scope.products=[];
    $scope.currentCategory=null;
    $scope.propertyName="price";
    $scope.reverse=false;
    $scope.searchText='';

    $scope.init=function(){
      SearchHomeService.fetchProducts().then(function(products){
        $scope.currentCategory={
          category:$stateParams.category,
          subCategory:$stateParams.subCategory
        };
	
	return SearchHomeService.getResults($scope.currentCategory);
      }).then(function(products){
	$scope.products=products
      });
    };

    $scope.init();

    $scope.showProductsByOptions=[
      {
        name:"Low Price",
        id:1,
        propertyName:"price",
        reverse:false
      },
      {
        name:"High Price",
        id:2,
        propertyName:"price",
        reverse:true
      },
      {
        name:"Newest",
        id:3,
        propertyName:"date",
        reverse:true
      },
      {
        name:"Oldest",
        id:4,
        propertyName:"date",
        reverse:false
      }
    ];

    $scope.showProductsBy=$scope.showProductsByOptions[0];

    $scope.showProductsByUpdate=function(showProductsBy){
      $scope.showProductsBy=showProductsBy;
      $scope.propertyName=$scope.showProductsBy.propertyName;
      $scope.reverse=$scope.showProductsBy.reverse;

      $scope.show();

      $timeout(function(){
        $scope.hide();
      },1000);
    };

    $scope.addToCart=function(item){
      SearchHomeService.addToCart(item);

      $scope.showAlert({
        title: 'Add to Cart',
        template: 'Product added to Cart'
      });
    };

    $scope.search=function(){
      $scope.show();

      $timeout(function(){
        $scope.hide();
      },2000);

      console.log("search clicked");   
    };

    $scope.loadMore=function(){
      $scope.show();
      $timeout(function(){
        $scope.hide();
      },2000);
    };

    $scope.showProductDetails=function(item){
      ProductDetailService.setCurrentProduct(item);

      $state.go('tabs.search.detail',{productId:item.id});
    };
  }]);

  app.controller('ProductDetailsController',['$scope','$stateParams','ProductDetailService',function($scope,$stateParams,ProductDetailService){
    $scope.product=ProductDetailService.getCurrentProduct(); 
    $scope.interestedToPay=false;
  }]);
})();
