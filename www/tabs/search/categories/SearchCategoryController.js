(function(){
  var app=angular.module('softMart.searchCategoryControllers',[]);
    
  app.controller('SearchCategoryController',['$scope','SearchCategoryService','$state',function($scope,SearchCategoryService,$state){

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

  }]);
})();
