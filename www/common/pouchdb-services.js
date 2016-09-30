/*
  PouchDB modules initializes and populates the DB
*/
(function(){
  //Initialize the modules and its dependencies
  var app=angular.module('softMart.pouchDbServices',[]);

  /*
    PoucDBService - Handles PouchDB and does the following,
        1) initialize the DB object
        2) populate the DB with initial data
  */
  app.factory('PouchDbService',function($q,$http){
    /*
      Variable declaration section
    */
    var _db;
    
    /*
      Private function section
    */
    
    /*
      populateDb - Checks if the database was prepopulated and loads the data if it was not
    */
    var populateDb=function(){
    
      //Checking if "prepopulated" attribute was set in the database
      //PouchDB raises error if a record is not present
      //$q.when is used to wrap the PouchDB promise to Angular promise for automatic model updates
      return $q.when(_db.get('prepopulated')).catch(function(err){
        //Checking the error code
        if(err.name==='not_found'){
          console.log('Database not populated. Populating ...');

          //Use $http to load the sample data from json and
          return $http.get('tabs/search/categories/categories.json');  
        }
        //Something else happened so throw the error
        else{
          throw err;
        }
      }).then(function(resp){
        //Suppose the DB was "prepopulated" the "$http" wouldn't be called in the catch block above
        //So, we carefully check if the resp contains the "data" attribute, before assuming that the response was from $http 
        if(resp && resp.data){
          //Store the categories on to a local variable
          var categories=resp.data.categories;

          var prepopulated={
            _id:"prepopulated",
            value:true
          };

          var user={
            _id:"samwilson30",
            firstname:"Sam",
            lastname:"Wilson",
            email:"sam.wilson@shield.org",
            phone:"7489367123",
            type:"user"
          }

          //Store the "prepopulated" and "user" docs
          categories.push(user);
          categories.push(prepopulated);

          console.log('Bulk Inserting data');

          //Bulk insert all the records into the DB
          return _db.bulkDocs(categories);
        }
      }).then(function(){
         //Confirm that DB was "prepopulated" by querying the DB
        return _db.get('prepopulated');
      }).then(function(resp){
        //This would be true if DB was repopulated
        if(resp.value){
          console.log('Database Prepopulated');
        }
        //Return the value to notify whomever wants to know if the "init" process was complete
        return resp.value;
      }).catch(function(err){ //Common catch block to catch all the errors
          console.log("Error: ",err);
      })
    };
    
    /*
      Exported function section
    */
    
    /*
      initDb - load the DB and populate the DB
    */
    var initDb=function(){
      _db=new PouchDB('softMartDB');

     return populateDb();
    };

    /*
      getB - return the DB object
    */
    var getDb=function(){
      return _db;
    };

    //Functions exported through this factory
    return {
      initDb:initDb,
      getDb:getDb
    };
  });
})();
