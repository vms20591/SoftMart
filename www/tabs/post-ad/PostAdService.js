(function(){
  var app=angular.module('softMart.postAdServices',[]);

  app.factory('PostAdService',['$q','SearchCategoryService','PouchDbService',function($q,SearchCategoryService,PouchDbService){
    var manufacturedYearOptions=[];
    var start=1970;
    var stop=new Date().getUTCFullYear();
    var postedAds;
    var _db=PouchDbService.getDb();

    for(var i=start;i<=stop;i++){
      manufacturedYearOptions.push(i);
    }

    var getCategories=function(){
      return SearchCategoryService.getCategories();
    }

    var getManufacturedYearOptions=function(){
      return manufacturedYearOptions;
    }
    
    var postAd=function(product){
      return $q.when(_db.post(product));
    };

    var getPostedAds=function(userId){
      return $q.when(_db.allDocs({include_docs:true}));
    };

    return {
      getCategories:getCategories,
      getManufacturedYearOptions:getManufacturedYearOptions,
      postAd:postAd,
      getPostedAds:getPostedAds
    };
  }]);
})();
