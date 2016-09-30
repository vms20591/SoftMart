(function(){
  var app=angular.module('softMart.searchResultControllers',[]);

  app.controller('SearchResultController',['$scope','$timeout','$state','$stateParams','$ionicPlatform','SearchHomeService','ProductDetailService',function($scope,$timeout,$state,$stateParams,$ionicPlatform,SearchHomeService,ProductDetailService){

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
	$scope.products=products;
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

    $scope.getDefaultImage=function(product){
      var returnValue='assets/img/noicon.svg';
      angular.forEach(product._attachments,function(value,key){
        if(key===product.defaultImg){
          returnValue=value.src;
        }
      });

      return returnValue;
    };
  }]);

  app.controller('ProductDetailsController',['$scope','$stateParams','$ionicPlatform','ProductDetailService',function($scope,$stateParams,$ionicPlatform,ProductDetailService){
    //This "vm" represents list of images
    $scope.imgSrcs=[];

    //This "vm" represents the currently selected img
    $scope.selectedImg='assets/img/noicon.svg';

    $ionicPlatform.ready(function(){
      $scope.product=ProductDetailService.getCurrentProduct(); 

      angular.forEach($scope.product._attachments,function(value,key){
        if(key===$scope.product.defaultImg){
          $scope.selectedImg=value.src;
        }

        $scope.imgSrcs.push(value.src);
      });
    });

    $scope.updateSelectedImg=function(index){
      $scope.selectedImg=$scope.imgSrcs[index];
    };

    $scope.notifySeller=function(){
      $scope.showAlert({
        title: 'Success',
        template: 'Notify Seller Successful'
      });
    };
  }]);
})();
