angular.module('starter.controller',['starter.services'])
        .controller('imageCtrl',function($scope,$interval){
           $scope.i=1;
           $interval(function(){
               $scope.i=$scope.i+1;
               if($scope.i==4){
                   $scope.i=1;
               }
            },2000);
        })
   
        .controller('menuCtrl',function($scope,$ionicSideMenuDelegate,photoService){
          $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.camera=photoService.photo();
        })