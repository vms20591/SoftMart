(function(){
  var app=angular.module('softMart.searchResultControllers',[]);

  app.controller('SearchResultController',['$scope','$timeout','$state','$stateParams','$ionicPlatform','SearchResultService','AdDetailService',function($scope,$timeout,$state,$stateParams,$ionicPlatform,SearchResultService,AdDetailService){

    $scope.adResults=[];
    $scope.currentCategory=null;
    $scope.propertyName="price";
    $scope.reverse=false;
    $scope.searchText='';
    $scope.noAdsText='';

    $ionicPlatform.ready(function(){
      $scope.currentCategory={
        category:$stateParams.category,
        subCategory:$stateParams.subCategory
      };
      
      $scope.show();

      $timeout(function(){
        SearchResultService.getSearchResults($scope.currentCategory).then(function(products){
          $scope.adResults=products;
          
          $scope.noAdsText='No Ads posted in this category.';
        });
      
        $scope.hide();
      },1000);
    });

    $scope.showAdsByOptions=[
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
        propertyName:"postedOn",
        reverse:true
      },
      {
        name:"Oldest",
        id:4,
        propertyName:"postedOn",
        reverse:false
      }
    ];

    $scope.showAdsBy=$scope.showAdsByOptions[2];

    $scope.showAdsOnUpdate=function(showAdsBy){
      $scope.show();

      $timeout(function(){
        $scope.showAdsBy=showAdsBy;
        $scope.propertyName=$scope.showAdsBy.propertyName;
        $scope.reverse=$scope.showAdsBy.reverse;
      
        $scope.hide();
      },300);
    };

    $scope.addToCart=function(ad){
      SearchResultService.addToCart(ad);

      $scope.showAlert({
        title: 'Add to Cart',
        template: 'Ad successfully added to Cart'
      });
    };

    $scope.showAdDetails=function(ad){
      AdDetailService.setCurrentAd(ad);

      $state.go('ad-detail',{adId:ad._id});
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
