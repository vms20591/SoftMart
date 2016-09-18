(function(){
  var app=angular.module('softMart.initController',[]);

  app.controller('InitController',['$scope','$timeout','$state','$interval',function($scope,$timeout,$state,$interval){
    $timeout(function(){
      //$state.go('tabs.home');
      if(angular.isDefined(stop)){
        $interval.cancel(stop);
        stop=undefined;
        $scope.loading=false;
        $scope.on=false;
        $state.go('tabs.home');
      }
    },3000);

    $scope.on=false;
    $scope.loading=true;
    var stop;

    $scope.animate=function(){
      if(angular.isDefined(stop)){
        return;
      }
      stop=$interval(function(){
        $scope.on=($scope.on)?false:true;
      },500);
    };

    $scope.animate();
  }]);
})();
