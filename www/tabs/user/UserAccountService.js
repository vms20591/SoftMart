/*
  UserAccountService module for activities related to the current user
*/
(function(){
  //Initialize the modules and its dependencies
  var app=angular.module('softMart.userAccountServices',['softMart.myAdDetailsServices']);

  /*
    UserAccountService - Handles and does the following,
        1) Currently logged in user
        2) Current user profile
        3) User cart
        4) User posted Ads
        5) User settings
  */
  app.factory('UserAccountService',['$q','PouchDbService','PostAdService',function($q,PouchDbService,PostAdService){
    /*
      Variable declaration section
     */
     
    var userAccount={};

    //Stores the logged in user
    var loggedInUser;

    //Stores the PouchDb object
    var _db=PouchDbService.getDb();

    //Ads posted by user
    var adsPostedByUser;
    
    //Ads in user cart
    var adsInCart=[];
    
    /*
      Private function section
     */

    /*
      Functions exposed via this service
     */

    /*
      loginUser - log in the passed in user
     */
    userAccount.loginUser=function(userId){
      //Query the db for the user  
      return $q.when(_db.get(userId)).then(function(resp){
        //If found log in the user
        loggedInUser=resp;

        console.log(userId," successfully logged in");
      }).catch(function(err){
        //If any error display error  
        console.log("Error occured while logging in: ",userId,"; Error: ",err)
      });
    }

    /*
      getLoggedInUser - return the logged in user
     */
    userAccount.getLoggedInUser=function(){
      return loggedInUser;
    };

    /*
      getAdsPostedByUser - returns Ads posted by the current user
     */
    userAccount.getAdsPostedByUser=function(){
      var userId=loggedInUser._id;
      
      var options={
        include_docs:true,
        attachments:true,
        binary:true
      };

      return PostAdService.getPostedAds(options).then(function(resp){
        return resp;
      }).catch(function(err){
        console.log("Error occured while retrieving ads for current user: ",err);   
      });
    };
    
    userAccount.addToCart=function(ad){
      if(loggedInUser['cart'].indexOf(ad._id)==-1){
        loggedInUser['cart'].push(ad._id);
        
        return $q.when(_db.put(loggedInUser)).then(function(resp){
          if(resp.ok){
            adsInCart.push(ad);
            
            loggedInUser._id=resp.id;
            loggedInUser._rev=resp.rev;
            
            return true;
          }
          else{
            loggedInUser['cart'].splice(loggedInUser['cart'].indexOf(ad._id),1);
            
            return false;
          }            
        }).catch(function(err){
          console.log('Error occured while adding to cart ',err);
          
          loggedInUser['cart'].splice(loggedInUser['cart'].indexOf(ad._id),1);
          
          return false;
        });
      }
      else{
        return $q.when(true);
      }
    };

    userAccount.getAdsInCart=function(){
      var options={
        include_docs:true,
        attachments:true,
        binary:true
      };
      
      if(adsInCart.length==0){
        return PostAdService.getPostedAds(options).then(function(ads){
          ads.filter(function(ad){
            loggedInUser['cart'].map(function(id){
              if(id===ad._id){
                adsInCart.push(ad);
              }
            });
          });
          
          return adsInCart;
        }).catch(function(err){
          console.log('Error occured while adding to cart ',err);
        });
      }
      else{
        return $q.when(adsInCart);
      }
    };
    
    userAccount.updateCart=function(){
      var options={
        include_docs:true,
        attachments:true,
        binary:true
      };
      
      return PostAdService.getPostedAds(options).then(function(ads){
        ads.filter(function(ad){
          adsInCart.map(function(temp){
            if(temp._id===ad._id && temp._rev!==ad._rev && ad._rev>temp._rev){
              angular.copy(ad,temp)
            }
          });
        });
        
        return adsInCart;
      }).catch(function(err){
        console.log('Error occured while updating cart ',err);
      });
    };
    
    userAccount.removeAdFromCart=function(ad){
      loggedInUser['cart'].splice(loggedInUser['cart'].indexOf(ad._id),1);
      
      return $q.when(_db.put(loggedInUser)).then(function(resp){
        if(resp.ok){
          adsInCart.splice(adsInCart.indexOf(ad),1);
          
          loggedInUser._id=resp.id;
          loggedInUser._rev=resp.rev;
          
          return true;
        }
        else{
          loggedInUser['cart'].push(ad._id);
          
          return false;
        }
      }).catch(function(err){
        console.log('Error occured while removing from cart',err);
        
        return false;
      });
    };
    
    //Export the functions
    return userAccount;
  }]);

})();
