(function(){
  var app=angular.module('softMart.controllers',[]);

  app.controller('AppController',function($scope,$timeout,$ionicLoading,$ionicPopup,SearchCategoryService){
      $scope.show = function() {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple"></ion-spinner><br/><span class="title">Loading...</span>'
        }).then(function(){
          console.log("The loading indicator is now displayed");
        });
      };
        
      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });
      };

      $scope.init=function(){
        $scope.show();
        SearchCategoryService.setCategories().then(function(){
          $timeout(function(){
            $scope.hide();  
          },2000); 
        });
      };

      $scope.showAlert = function(opts) {
        if(!opts){
          opts={
            title: 'Default',
            template: 'Default'
          };  
        }
        var alertPopup = $ionicPopup.alert(opts);

       alertPopup.then(function(res) {
         console.log('Default alert popup logging');
       });
    };
  });

  app.controller('TabsController',function($scope){});

  app.controller('HomeTabController',function($scope){
    $scope.options={
      loop:true,
      autoplay:1500,
      pager:true
    };
  });
  
  app.controller('SearchCategoryTabController',function($scope,SearchCategoryService){

    $scope.groups = SearchCategoryService.getCategories();

    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };
  });

  app.controller('SearchHomeTabController',function($scope,$timeout,$stateParams){
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
  });
  
  app.controller('PostAdTabController',function($scope){});
  
  app.controller('MyAccountTabController',function($scope){});

})();
