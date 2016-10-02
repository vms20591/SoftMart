(function(){
  var app=angular.module('softMart.adDetailsServices',[]);
  
  app.factory('AdDetailService',['UserAccountService',function(UserAccountService){
    var adDetails={};
    var currentAd;

    adDetails.setCurrentAd=function(ad){
      currentAd=ad;
    };

    adDetails.getCurrentAd=function(){
      return currentAd;
    };

    return adDetails;
  }]);
  
})();
