(function(){
  var app=angular.module('softMart.postAdServices',[]);

  app.factory('PostAdService',['$q','$timeout','SearchCategoryService','PouchDbService','CallbackService',function($q,$timeout,SearchCategoryService,PouchDbService,CallbackService){
    var postAds={};
    var manufacturedYearOptions=[];
    var start=1970;
    var stop=new Date().getUTCFullYear();
    var _db=PouchDbService.getDb();
    
    var transformAttachments=function(attachments){
      angular.forEach(attachments,function(value,key,obj){
        obj[key]['src']=URL.createObjectURL(value.data);
      });
    };

    var transformAds=function(resp){
      return resp.rows.map(function(row){
        return row.doc;
      }).filter(function(row){
        if(row.type==='ads'){
          row.postedOn=new Date(row.postedOn);
          
          if(row._attachments){
            transformAttachments(row._attachments);
          };

          return true;
        }

        return false;
      });
    };

    postAds.getCategories=function(){
      return SearchCategoryService.getCategories();
    }

    postAds.getManufacturedYearOptions=function(){
    
      if(manufacturedYearOptions.length===0){
        for(var i=start;i<=stop;i++){
          manufacturedYearOptions.push(i);
        }      
      }
      
      return manufacturedYearOptions;
    }
    
    postAds.postAd=function(product){
      return $q.when(_db.post(product)).then(function(resp){
        //Intentionally adding a timeout here to give the db a chance to persist the changes properly
        $timeout(function(){
          CallbackService.notifyOnAddItem('ads.add')
        },2000);
                
        return resp;
      });
    };

    postAds.getPostedAds=function(options){
      if(!options){
        options={
          include_docs:true
        };
      }
      return $q.when(_db.allDocs(options)).then(function(resp){
        return transformAds(resp);
      });
    };
    
    postAds.updatePostedAd=function(ad){
      return $q.when(_db.put(ad)).then(function(resp){
        CallbackService.notifyOnEditItem('ads.edit');
        
        return resp;
      }).catch(function(err){
        console.log("Error occured while updating Ad: ",err);
      });
    };
    
    postAds.deletePostedAd=function(ad){
      return $q.when(_db.get(ad._id)).then(function(resp){
        resp._deleted=true;

        return _db.put(resp);
      }).then(function(resp){
        CallbackService.notifyOnDeleteItem('ads.delete');
        
        return resp;
      });
    };
    
    return postAds;
  }]);
})();
