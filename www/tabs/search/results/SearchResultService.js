(function(){
  var app=angular.module('softMart.searchResultServices',[]);

  app.factory('SearchResultService',['$http','$q','PouchDbService','PostAdService','UserAccountService',function($http,$q,PouchDbService,PostAdService,UserAccountService){
    var searchResults={}

    var adResults=null;
    var _db=PouchDbService.getDb();

    var filterAds=function(currentCategory){
      return adResults.filter(function(ad){
	      return ad.selectedCategory===currentCategory.category && 
	        ad.selectedSubCategory===currentCategory.subCategory;
      });      
    };
    
    var transformAttachments=function(attachments){
      angular.forEach(attachments,function(value,key,obj){
        obj[key]['src']=URL.createObjectURL(value.data);
      });
    };

    var getPostedAds=function(){
      if(adResults===null){
      
        var options={
          include_docs:true,
          attachments:true,
          binary:true
        };
      
        return PostAdService.getPostedAds(options).then(function(resp){
          adResults=resp;
          _db.changes({live:true,since:'now',include_docs:true,attachments:true,binary:true}).on('change',reactToChange);


          return adResults;
        }).catch(function(err){
          console.log(err);
        });
      }
      else{
        return $q.when(adResults);
      }
    };
    
    var reactToChange=function(change){
      console.log("Change: ",change);
        
      if(change.deleted){
        reactToDelete(change.id);
      }
      else{
        reactToInsertOrUpdate(change);
      }
    }

    var binarySearch=function(arr, docId) {
      var low = 0, high = arr.length, mid;
     
      while (low < high) {
        mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
        arr[mid]._id < docId ? low = mid + 1 : high = mid
      }

      return low;
    };

    var reactToDelete=function(id){
      var index=binarySearch(adResults,id);

      var ad=adResults[index];

      if(ad && ad._id===id){
        adResults.splice(index,1)
      }
    };

    var reactToInsertOrUpdate=function(newAd){
      var index=binarySearch(adResults,newAd.id);

      var ad=adResults[index];
      
      formatAttachments(newAd.doc._attachments);

      if(ad && ad._id===newAd.id){
        adResults[index]=newAd.doc;
      }
      else{
        adResults.splice(index,0,newAd.doc);
      }
    };

    searchResults.addToCart=function(ad){
      UserAccountService.addToCart(ad);
    };

    searchResults.getSearchResults=function(currentCategory){
      var defer=$q.defer();
      var results=[];

      if(adResults===null){
        getPostedAds().then(function(data){
          results=filterAds(currentCategory);
          defer.resolve(results);
        },function(error){
          defer.reject(error);
        });
      }
      else{
        results=filterAds(currentCategory);
        defer.resolve(results);
      }

      return defer.promise;
    };

    return searchResults;
  }]);

})();
