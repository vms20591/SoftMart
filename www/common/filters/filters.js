/*
  Filter modules for application wide usage
*/
(function(){
  //Initialize the module and its dependencies
  var app=angular.module('softMart.softMartFilters',[]);

  /*
    sinceTimePassed - Uses "moment.js" to take a time object in the format specified and say the time specified
    Ex: current time - 29/09/2016, input time - 28/09/2016, format - dd/mm/yyyy
        filter output -> "1 day ago"
  */
  app.filter('sinceTimePassed',function(){
      return function(input,format){
        var result=input+" ("+moment(input,format).fromNow()+")";

        return result;
      };
  });
})();
