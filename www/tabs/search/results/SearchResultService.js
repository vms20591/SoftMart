(function(){
  var app=angular.module('softMart.searchResultServices',[]);

  app.factory('SearchHomeService',['$http','$q',function($http,$q){
    var products=null;
    var productsInCart=[];

    var filter_products=function(currentCategory){
      return products.filter(function(product){
	return product.category===currentCategory.category && 
	  product.sub_category===currentCategory.subCategory;
      });      
    };

    var format_products=function(products){
      return products.map(function(product){
        product.posted_date=new Date(product.posted_date); 

        return product;
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
      var defer=$q.defer();

      if(products===null){
        $http.get('tabs/search/results/products.json').then(function(resp){
          products=format_products(resp.data.products);
          defer.resolve(products);
        },function(error){
          defer.reject(error);  
        });
      }
      else{
        defer.resolve(products);
      }

      return defer.promise;
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
