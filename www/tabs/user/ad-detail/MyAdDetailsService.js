(function(){
  var app=angular.module('softMart.myAdDetailsServices',[]);
  
  app.factory('MyAdDetailService',['UserAccountService',function(UserAccountService){
    var adDetails={};
    var currentAd;

    adDetails.setCurrentAd=function(ad){
      currentAd=ad;
    };

    adDetails.getCurrentAd=function(){
      return currentAd;
    };
    
    adDetails.adPostedByCurrentUser=function(){
      var loggedInUser=UserAccountService.getLoggedInUser();
      
      if(currentAd.user_id===loggedInUser._id){
        return true;
      }
      
      return false;
    };

    return adDetails;
  }]);
  
})();
