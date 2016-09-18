(function(){
  var app=angular.module('softMart.softMartFilters',[]);

  app.filter('sinceTimePassed',function(){
      return function(input,format){
        var result=input+" ("+moment(input,format).fromNow()+")";

        return result;
      };
  });
})();
