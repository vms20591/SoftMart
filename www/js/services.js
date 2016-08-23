(function(){
  var app=angular.module('softMart.services',[]);

  app.factory('SearchCategoryService',function($http,$q){
  
    var categories=null;

    var setCategories=function(){
      var defer=$q.defer();

      if(categories===null){
        $http.get('categories.json').then(function(data){
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
  });

  app.factory('SearchHomService',function($http,$q){
    var products=null;

    var filter_products=function(category_name,item){
      var results=[];

      return results;
    };

    var fetch_products=function(){
      var defer=$q.defer();

      if(products===null){
        $http.get('products.json').then(function(data){
          products=data.data.categories;
          defer.resolve(categories);
        },function(error){
          defer.reject(error);  
        });
      }
      else{
        defer.resolve(products);
      }

      return defer.promise;
    };

    var getResults=function(category_name,item){
      var defer=$q.defer();
      var results=[];

      if(products===null){
        fetch_products().then(function(data){
          results=filter_products(category_name,item);
          defer.resolve(results);
        },function(error){
          defer.reject(error);
        });
      }
      else{
        results=filter_products(category_name,item);
        defer.resolve(results);
      }

      return defer.promise;
    };

    return {
      fetch_products:fetch_products,
      getResults:getResults
    };
  });

})();
