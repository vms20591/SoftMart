/*
  UserAccountService module for activities related to the current user
*/
(function(){
  //Initialize the modules and its dependencies
  var app=angular.module('softMart.userAccountServices',[]);

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

    //Stores the logged in user
    var loggedInUser;

    //Stores the PouchDb object
    var _db=PouchDbService.getDb();

    //Ads posted by user
    var adsPostedByUser;

    /*
      Private function section
     */

    /*
      Functions exposed via this service
     */

    /*
      loginUser - log in the passed in user
     */
    var loginUser=function(userId){
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
    var getLoggedInUser=function(){
      return loggedInUser;
    };

    /*
      getAdsPostedByUser - returns Ads posted by the current user
     */
    var getAdsPostedByUser=function(){
      var userId=getLoggedInUser()._id;

      if(!adsPostedByUser){
        return PostAdService.getPostedAds().then(function(resp){
          var ads=resp.rows.map(function(row){
            return row.doc;
          }).filter(function(row){
            if(row.type==='ads' && row.user_id===userId){
              row.postedOn=new Date(row.postedOn);

              return true;
            }

            return false;
          });

          adsPostedByUser=ads;

          return ads;
        }).catch(function(err){
          console.log("Error occured while retrieving ads for current user: ",err);   
        });
      }
      else{
        return $q.when(adsPostedByUser);
      }
    };

    /*
      getAdsPostedByUserLength - returns the length of Ads posted by the User
     */
    var getAdsPostedByUserLength=function(){
      if(!adsPostedByUser){
        return getAdsPostedByUser().then(function(resp){
          var ads=resp;

          return ads.length;
        }).catch(function(err){
          console.log("Error occured while retrieving lengs of ads posted by current user: ",err);
        });
      }
      else{
        return adsPostedByUser.length;
      }
    };

    //Export the functions
    return {
      loginUser:loginUser,
      getLoggedInUser:getLoggedInUser,
      getAdsPostedByUser:getAdsPostedByUser,
      getAdsPostedByUserLength:getAdsPostedByUserLength
    };
  }]);

})();
