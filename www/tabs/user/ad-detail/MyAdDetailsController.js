(function(){
  var app=angular.module('softMart.myAdDetailsControllers',[]);

  app.controller('MyAdDetailsController',['$scope','$stateParams','$ionicPlatform','$ionicHistory','$ionicModal','MyAdDetailService','PostAdService',function($scope,$stateParams,$ionicPlatform,$ionicHistory,$ionicModal,MyAdDetailService,PostAdService){
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

    $ionicPlatform.ready(function(){
      $scope.ad=MyAdDetailService.getCurrentAd(); 

      angular.forEach($scope.ad._attachments,function(value,key){
        if(key===$scope.ad.defaultImg){
          $scope.selectedImg=value.src;
        }

        $scope.imgSrcs.push(value.src);
      });
      
      $ionicModal.fromTemplateUrl('tabs/user/ad-detail/my-ad-edit-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      }).catch(function(err){
        console.log(err);
      });
    });
    
    $scope.goBack = function(){
      $ionicHistory.goBack();
    };
    
    $scope.updateSelectedImg=function(index){
      $scope.selectedImg=$scope.imgSrcs[index];
    };

    $scope.openEditModal=function(){
      $scope.adCopy=angular.copy($scope.ad);
      
      $scope.categorySelectOptions.forEach(function(category){
        if(category.name===$scope.adCopy.selectedCategory){
          $scope.adCopy.selectedCategory=category;
          $scope.subCategorySelectOptions=category.items;
        }
      });
    
      $scope.modal.show();
    };
    
    $scope.closeEditModal=function(){
      $scope.modal.hide();
    };    
    
    $scope.updateAndSaveAd=function(){
      var tempSelectedCategory=$scope.adCopy.selectedCategory;
      
      $scope.adCopy.selectedCategory=$scope.adCopy.selectedCategory.name;
      
      PostAdService.updatePostedAd($scope.adCopy).then(function(resp){
        if(resp && resp.ok){
          $scope.ad.name=$scope.adCopy.name;
          $scope.ad.description=$scope.adCopy.description;
          $scope.ad.price=$scope.adCopy.price;
          $scope.ad.selectedCategory=$scope.adCopy.selectedCategory;
          $scope.ad.selectedSubCategory=$scope.adCopy.selectedSubCategory;
          $scope.ad.type=$scope.adCopy.type;
          $scope.ad.postedOn=$scope.adCopy.postedOn;
          $scope.ad.user_id=$scope.adCopy.user_id;
          $scope.ad.contact.disclose=$scope.adCopy.contact.disclose;
          $scope.ad.contact.email=$scope.adCopy.contact.email;
          $scope.ad.contact.phone=$scope.adCopy.contact.phone;
          $scope.ad._id=resp.id;
          $scope.ad._rev=resp.rev;
        }
        else{
          $scope.adCopy.selectedCategory=tempSelectedCategory;
        }
      });
      $scope.modal.hide();
    };
    
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  }]);

})();  
