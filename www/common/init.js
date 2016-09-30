/*
  Init loads the application and has the following job,
  
    1) Load the initial splash screen
    2) Load the PouchDB and initially any initially required data
    3) Once done, load navigate to the "tabs home" state  
    
    Note: "vm" in comments mean "View Model"
*/
(function(){
  var app=angular.module('softMart.initController',[]);

  //Defining "Init Controller" and its dependencies
  app.controller('InitController',['$scope','$timeout','$state','$interval','dbInitialized','UserAccountService',function($scope,$timeout,$state,$interval,dbInitialized,UserAccountService){
    /*
      Variable declaration section
    */
    
    //This vm controls the app animation icon
    $scope.on=false;
    
    //This vm controls the display of "loading app..." text
    $scope.loading=true;
    
    //This local variable holds the $interval object so that it can be canceled
    var stop;

    /*
      checkIfDbInitialized - Function declaration section
    */
    var checkIfDbInitialized=function(){
      //login the default user
      UserAccountService.loginUser("samwilson30"); 

      //Start the $timeout, this is just to simulate that the app is loading
      $timeout(function(){
        //Cancel the $interval if its defined
        if(angular.isDefined(stop)){
          console.log("Db Initialized: ",dbInitialized);

          //Cancel the animation
          $interval.cancel(stop);
          stop=undefined;
          
          //Turn off the animation and loading text
          $scope.loading=false;
          $scope.on=false;
          
          //Navigate to the "tabs home" state
          $state.go('tabs.home');
        }
      },2000);
    };

    /*
      $scope.animate - Start showing the icon animation and loading text
    */
    $scope.animate=function(){
      //Don't restart the interval if its already defined
      if(angular.isDefined(stop)){
        return;
      }
      
      //Start the $interval
      stop=$interval(function(){
        $scope.on=($scope.on)?false:true;
      },500);

    };
    
    //Kick off the animation and loading text
    $scope.animate();

    //Check if DB was initialized
    checkIfDbInitialized();

  }]);
})();
