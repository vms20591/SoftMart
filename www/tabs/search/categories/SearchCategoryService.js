(function(){
  var app=angular.module('softMart.searchCategoryServices',[]);

  app.factory('SearchCategoryService',['$http','$q',function($http,$q){
  
    var categories=null;

    var setCategories=function(){
      var defer=$q.defer();

      if(categories===null){
        $http.get('tabs/search/categories/categories.json').then(function(data){
          categories=data.data.categories;
          defer.resolve(categories);
        },function(error){
          defer.reject(error);  
        });
      }
      else{
        defer.resolve(categories);
      }

      return defer.promise;
    };

    var getCategories=function(){
      return categories;
    };

    return {
      setCategories:setCategories,
      getCategories:getCategories
    };
  }]);

})();
