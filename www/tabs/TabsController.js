(function(){
  var app=angular.module('softMart.tabsControllers',['softMart.homeControllers','softMart.postAdControllers','softMart.userControllers','softMart.searchControllers']);

  app.controller('TabsController',['$scope','$timeout','$ionicLoading','$ionicPopup','SearchCategoryService','PouchDbService',function($scope,$timeout,$ionicLoading,$ionicPopup,SearchCategoryService,PouchDbService){

    $scope.show = function() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple"></ion-spinner><br/><span class="title">Loading...</span>'
      });
    };
        
    $scope.hide = function(){
      $ionicLoading.hide();
    };

    $scope.init=function(){
      SearchCategoryService.setCategories();
      PouchDbService.initDb();
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
    };

  }]);
})();
