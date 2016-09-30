/*
  PostAdController module for activities related to posting Ads

  Note: "vm" represents "ViewModel" below"
*/
(function(){
  //Initialize the module and its dependencies
  var app=angular.module('softMart.postAdControllers',[]);

  /*
    PostAdController - manages create, update and delete of Ads posted by the logged in user
   */
  app.controller('PostAdController',['$scope','$cordovaCamera','PostAdService','UserAccountService',function($scope,$cordovaCamera,PostAdService,UserAccountService){
    /*
      Variable declaration section
     */

    //Private variable - to reinitialize the product   
    var initProduct={
        contact:{
          disclose:false
        }
    };

    //Camera specific source type
    var fromCameraSrcType=Camera.PictureSourceType.CAMERA;

    //Gallery specific source type
    var fromGallerySrcType=Camera.PictureSourceType.PHOTOLIBRARY;

    //Options for uploading photos
    var cameraOptions={
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.CAMERA,
      allowEdit:true,
      encodingType:Camera.EncodingType.JPEG,
      targetWidth:300,
      targetHeight:300,
      popoverOptions:CameraPopoverOptions,
      saveToPhotoAlbum:true,
      correctOrientation:true
    };

    //This "vm" represents list of images
    $scope.imgSrcs=[];

    //This "vm" represents the currently selected img
    $scope.selectedImg;

    //This "vm" represents the current Ad
    $scope.product=null;

    //This "vm" holds the options of Category in the PostAd form
    $scope.categorySelectOptions=[];

    //This "vm" holds the options of Sub-category in the PostAd form
    $scope.subCategorySelectOptions=[];

    //This "vm" holds the options for Manufactured year in the PostAd form
    $scope.manufacturedYearOptions=PostAdService.getManufacturedYearOptions();

    //Retrieve the "categories" from PostAdService and store it as the category options
    $scope.categorySelectOptions=PostAdService.getCategories();

    /*
      Private function section
     */
    var takePicture=function(options){
      $cordovaCamera.getPicture(options).then(function(imageData){
        var imgUri="data:image/jpeg;base64,"+imageData;

        $scope.imgSrcs.push(imgUri);
        $scope.selectedImg=imgUri;
      }).catch(function(err){
        console.log(err);
      });
    };

    /*
      Scope function section
     */

    /*
      $scope.updateCategoryOptions - update the sub-category options from the selected main category
     */
    $scope.updateCategoryOptions=function(selectedCategory){
      $scope.subCategorySelectOptions=selectedCategory.items;
    };

    /*
      $scope.initializeProduct - restore $scope.product to the initial state - this represents a clear form
     */
    $scope.initializeProduct=function(){
      $scope.product=angular.copy(initProduct);
    };

    /*
      $scope.postAd - Persists the Ad in db via PostAdService
     */
    $scope.postAd=function(){
      //only persist the category name  
      $scope.product.selectedCategory=$scope.product.selectedCategory.name;

      //set the type of document
      $scope.product.type="ads";

      //Store the date in json format
      $scope.product.postedOn=new Date().toJSON();

      //Store the user who posted it from the logged in user
      $scope.product.user_id=UserAccountService.getLoggedInUser()._id;

      if($scope.imgSrcs.length>0){
        $scope.product._attachments={};

        angular.forEach($scope.imgSrcs,function(value,key){
          value=value.replace('data:image/jpeg;base64,','');
          var def=false;
          var imgName=Date.now()+".jpg";

          $scope.product._attachments[imgName]={
            content_type:"image/jpeg",
            data:value
          };

          if(key===0){
            $scope.product.defaultImg=imgName;
          }

        });
      }

      //Call the service to persist the Ad
      PostAdService.postAd($scope.product).then(function(resp){
        console.log("New Posted Ad: ",resp);

        //Show success alert to the user
        $scope.showAlert({
          title: 'Success',
          template: 'Ad posted successfully'
        });

        //Reset the $scope.product "vm" which resets the form
        $scope.initializeProduct();
      }).catch(function(err){
        console.log(err);

        //If any error occurs show the alert to the user
        $scope.showAlert({
          title:'Failure',
          template:'Error occured while posting Ad'
        });
      });
    };

    /*
      Upload photo from Camera
     */
    $scope.chooseFromCamera=function(){
      cameraOptions.sourceType=fromCameraSrcType;
      takePicture(cameraOptions);
    };

    /*
      Upload photo from Gallery
     */
    $scope.chooseFromGallery=function(){
      cameraOptions.sourceType=fromGallerySrcType;
      takePicture(cameraOptions);
    };

    /*
      Update current image
     */
    $scope.updateSelectedImg=function(index){
      $scope.selectedImg=$scope.imgSrcs[index];
    };

    //Iinitialize the $scope.product "vm" to show a clear form initially
    $scope.initializeProduct();
  }]);
})();
