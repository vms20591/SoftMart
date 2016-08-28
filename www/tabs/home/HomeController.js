(function(){
  var app=angular.module('softMart.homeControllers',[]);

  app.controller('HomeController',['$scope',function($scope){
    $scope.options={
      loop:true,
      autoplay:1500,
      pager:true
    }; 
  }]);
})();
