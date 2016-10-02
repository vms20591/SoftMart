(function(){
  var app=angular.module('softMart.searchCategoryServices',[]);

  app.factory('SearchCategoryService',['$q','PouchDbService',function($q,PouchDbService){
    var categories=null;

    var setCategories=function(){
      var defer=$q.defer();

      if(categories===null){
        PouchDbService.getDb().allDocs({include_docs:true}).then(function(resp){
          categories=resp.rows.map(function(row){
            return row.doc;    
          }).filter(function(row){
            if(row.type==='category'){
              return true;
            }

            return false;
          });
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
