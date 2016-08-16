(function(){
  var app=angular.module('softMart.controllers',[]);

  app.controller('HomeTabController',function($scope){
    $scope.options={
      loop:true,
      autoplay:1500,
      pager:true
    };
  });
  
  app.controller('SearchTabController',function($scope){});
  
  app.controller('PostAdTabController',function($scope){});
  
  app.controller('MyAccountTabController',function($scope){});

})();
