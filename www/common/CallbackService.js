(function(){
  var app=angular.module('softMart.callbackServices',[]);

  app.factory('CallbackService',[function(){
    var callbacks={
      addItemCallbacks:{},
      editItemCallbacks:{},
      deleteItemCallbacks:{},
    };
    
    callbacks.registerForAddItem=function(eventName,callback){
      callbacks.addItemCallbacks[eventName]=callbacks.addItemCallbacks[eventName] || [];
    
      callbacks.addItemCallbacks[eventName].push(callback)
    };
    
    callbacks.registerForEditItem=function(eventName,callback){
      callbacks.editItemCallbacks[eventName]=callbacks.editItemCallbacks[eventName] || [];
    
      callbacks.editItemCallbacks[eventName].push(callback)
    };
    
    callbacks.registerForDeleteItem=function(eventName,callback){
      callbacks.deleteItemCallbacks[eventName]=callbacks.deleteItemCallbacks[eventName] || [];
    
      callbacks.deleteItemCallbacks[eventName].push(callback)
    };
    
    callbacks.notifyOnAddItem=function(eventName){
      callbacks.addItemCallbacks[eventName]=callbacks.addItemCallbacks[eventName] || [];
    
      callbacks.addItemCallbacks[eventName].forEach(function(callback){
        callback();
      });
    };
    
    callbacks.notifyOnEditItem=function(eventName){
      callbacks.editItemCallbacks[eventName]=callbacks.editItemCallbacks[eventName] || [];
    
      callbacks.editItemCallbacks[eventName].forEach(function(callback){
        callback();
      });
    };
    
    callbacks.notifyOnDeleteItem=function(eventName){
      callbacks.deleteItemCallbacks[eventName]=callbacks.deleteItemCallbacks[eventName] || [];
    
      callbacks.deleteItemCallbacks[eventName].forEach(function(callback){
        callback();
      });
    };
    
    return callbacks;
  }]);
})();
