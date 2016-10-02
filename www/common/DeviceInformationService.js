/*
  DeviceInformationService module for getting the device information while using device features.
  This helps avoiding errors while running the code in browser.
*/
(function(){
  //Initialize the module and its dependencies
  var app=angular.module('softMart.deviceInformationService',[]);
  
  app.factory("DeviceInformationService",function(){
    var deviceInformation={};
    
    var deviceInformation = ionic.Platform.device();

    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

    var currentPlatform = ionic.Platform.platform();
    var currentPlatformVersion = ionic.Platform.version();
    
    deviceInformation.inMobileMode=function(){
      return isWebView || isIPad || isIOS || isAndroid || isWindowsPhone;
    };
    
    return deviceInformation;
  });
})();
