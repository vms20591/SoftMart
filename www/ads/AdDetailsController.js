(function(){
  var app=angular.module('softMart.adDetailsControllers',[]);

  app.controller('AdDetailsController',['$scope','$stateParams','$ionicPlatform','$ionicHistory','$ionicPopup','AdDetailService','PostAdService',function($scope,$stateParams,$ionicPlatform,$ionicHistory,$ionicPopup,AdDetailService,PostAdService){
    //This "vm" represents list of images
    $scope.imgSrcs=[];

    //This "vm" represents the currently selected img
    $scope.selectedImg='assets/img/noicon.svg';
    
    //This "vm" holds the options of Category in the PostAd form
    $scope.categorySelectOptions=PostAdService.getCategories();

    //This "vm" holds the options of Sub-category in the PostAd form
    $scope.subCategorySelectOptions=[];

    //This "vm" holds the options for Manufactured year in the PostAd form
    $scope.manufacturedYearOptions=PostAdService.getManufacturedYearOptions();
    
    /*
      $scope.updateCategoryOptions - update the sub-category options from the selected main category
     */
    $scope.updateCategoryOptions=function(selectedCategory){
      $scope.subCategorySelectOptions=selectedCategory.items;
    };
    
    $scope.showAlert = function(opts) {
      if(!opts){
        opts={
          title: 'Default',
          template: 'Default'
        };  
      }
      
      var alertPopup = $ionicPopup.alert(opts);
    };

    $ionicPlatform.ready(function(){
      $scope.ad=AdDetailService.getCurrentAd(); 

      angular.forEach($scope.ad._attachments,function(value,key){
        if(key===$scope.ad.defaultImg){
          $scope.selectedImg=value.src;
        }

        $scope.imgSrcs.push(value.src);
      });
    });
    
    $scope.goBack = function(){
      $ionicHistory.goBack();
    };
    
    $scope.updateSelectedImg=function(index){
      $scope.selectedImg=$scope.imgSrcs[index];
    };

    $scope.notifySeller=function(){
      $scope.showAlert({
        title: 'Success',
        template: 'Notify Seller Successful'
      });
    };
  }]);
})();  
