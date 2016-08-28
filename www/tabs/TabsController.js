(function(){
  var app=angular.module('softMart.tabsControllers',['softMart.homeControllers','softMart.postAdControllers','softMart.userControllers','softMart.searchControllers']);

  app.controller('TabsController',['$scope','$timeout','$ionicLoading','$ionicPopup','SearchCategoryService',function($scope,$timeout,$ionicLoading,$ionicPopup,SearchCategoryService){

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
    
    $scope.init();

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

  }]);
})();
