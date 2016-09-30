(function(){
  var app=angular.module('softMart.searchResultServices',[]);

  app.factory('SearchHomeService',['$http','$q','PouchDbService',function($http,$q,PouchDbService){
    var products=null;
    var productsInCart=[];
    var db=PouchDbService.getDb();

    var filter_products=function(currentCategory){
      return products.filter(function(product){
	return product.selectedCategory===currentCategory.category && 
	  product.selectedSubCategory===currentCategory.subCategory;
      });      
    };

    var format_attachments=function(attachments){
      angular.forEach(attachments,function(value,key,obj){
        obj[key]['src']=URL.createObjectURL(value.data);
      });
    };

    var format_products=function(resp){
      return resp.rows.map(function(row){
        return row.doc;
      }).filter(function(row){
        if(row.type==='ads'){
          row.postedOn=new Date(row.postedOn);
          
          if(row._attachments){
            format_attachments(row._attachments);
          };

          return true;
        }

        return false;
      });
    };

    var addToCart=function(item){
      var flag=false;

      if(item && productsInCart.length>0){
        productsInCart.forEach(function(product){
          if(product===item){
            flag=true;
          }
        });
      }
      
      if(item && !flag){
        productsInCart.push(item);
      }
    };

    var getLengthOfCart=function(){
      return productsInCart.length;
    };

    var getProductsInCart=function(){
      return productsInCart;
    };

    var removeFromCart=function(index){
      productsInCart.splice(index,1);
    };

    var fetchProducts=function(){
      if(products===null){
        return $q.when(db.allDocs({include_docs:true,attachments:true,binary:true})).then(function(resp){
          products=format_products(resp);

          db.changes({live:true,since:'now',include_docs:true}).on('change',reactToChange);

          return products;
        }).catch(function(err){
          console.log(err);
        });
      }
      else{
        return $q.when(products);
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
      var index=binarySearch(products,id);

      var product=products[index];

      if(product && product._id===id){
        products.splice(index,1)
      }
    };

    var reactToInsertOrUpdate=function(newProduct){
      var index=binarySearch(products,newProduct.id);

      var product=products[index];

      if(product && product._id===newProduct.id){
        products[index]=newProduct.doc;
      }
      else{
        products.splice(index,0,newProduct.doc);
      }
    };

    var getResults=function(currentCategory){
      var defer=$q.defer();
      var results=[];

      if(products===null){
        fetch_products().then(function(data){
          results=filter_products(currentCategory);
          defer.resolve(results);
        },function(error){
          defer.reject(error);
        });
      }
      else{
        results=filter_products(currentCategory);
        defer.resolve(results);
      }

      return defer.promise;
    };

    return {
      fetchProducts:fetchProducts,
      getResults:getResults,
      addToCart:addToCart,
      getLengthOfCart:getLengthOfCart,
      getProductsInCart:getProductsInCart,
      removeFromCart:removeFromCart
    };
  }]);

  app.factory('ProductDetailService',function(){
    var currentProduct=null;

    var setCurrentProduct=function(product){
      currentProduct=product;
    };

    var getCurrentProduct=function(){
      return currentProduct;
    };

    return {
      setCurrentProduct:setCurrentProduct,
      getCurrentProduct:getCurrentProduct
    };
  });

})();
