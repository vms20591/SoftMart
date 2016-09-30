(function(){
  var app=angular.module('softMart.homeControllers',[]);

  app.controller('HomeController',['$scope','PouchDbService',function($scope,PouchDbService){
    $scope.options={
      loop:true,
      autoplay:1500,
      pager:true,
      autoplayDisableOnInteraction:false,
    }; 

    PouchDbService.getDb().allDocs({include_docs:true}).then(function(data){
      console.log(data);
    });
  }]);
})();
