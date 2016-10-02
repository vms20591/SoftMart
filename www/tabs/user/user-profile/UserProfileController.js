(function(){
  var app=angular.module('softMart.userProfileControllers',[]);

  app.controller('UserProfileController',['$scope','$ionicPlatform','UserAccountService',function($scope,$ionicPlatform,UserAccountService){
    $ionicPlatform.ready(function(){
      //This "vm" represents the currently selected img
      $scope.selectedImg='assets/img/noicon.svg';
      $scope.user=UserAccountService.getLoggedInUser();
    });

  }]);
})();
