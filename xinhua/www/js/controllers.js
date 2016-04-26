angular.module('starter.controller',['ngCordova'])
        .controller('imageCtrl',function($scope,$interval){
           $scope.i=1;
           $interval(function(){
               $scope.i=$scope.i+1;
               if($scope.i==4){
                   $scope.i=1;
               }
            },2000);
        })
   
        .controller('menuCtrl',function($scope,$cordovaCamera){
                
               
        })
        
    
        .controller('versionCtrl',function($scope,$cordovaInAppBrowser,$cordovaBarcodeScanner,$cordovaFileTransfer,$ionicSideMenuDelegate,$cordovaFile,$http,$ionicPopup,$timeout,$cordovaSpinnerDialog,$cordovaFileOpener2){
                                $scope.user='1.2';
                        $scope.takePhoto=function(){
                               $cordovaBarcodeScanner
                                .scan()
                                .then(function(barcodeData) {
                                  // Success! Barcode data is here 扫描数据：barcodeData.text
                                 $scope.scan=barcodeData.text;
                                alert(angular.toJson(barcodeData));
                                            var options = {
                                               location: 'yes',
                                               clearcache: 'yes',
                                               toolbar: 'no'
                                             };
                                          $cordovaInAppBrowser.open($scope.scan, '_blank', options)
                                         .then(function(event) {
                                           // success
                                         })
                                         .catch(function(event) {
                                           // error
                                         });
                                }, function(error) {
                                  // An error occurred
                                  alert('扫描失败');
                                });
       

                        }
                $scope.toggleLeftSideMenu = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };
            $scope.refresh=function(){ 
                $http.get('http://zz527844046.kpyun-1.cc/version.php')
                    .success(function(data) {
                       
                        $scope.nowVersion=data.appVersion;
                        if($scope.nowVersion!==$scope.user){
                             
                                var confirmPopup = $ionicPopup.confirm({
                                  title: '当前最新版本为'+$scope.nowVersion,
                                  template: '是否更新?'
                                });
                                confirmPopup.then(function(res) {
                                  if(res) {
                                            var url = "http://zz527844046.kpyun-1.cc/xinhua1.2.png";
                                            var targetPath = "/sdcard/阿震做的app/xinhua1.2.apk";
                                            var trustHosts = true;
                                            var options = {};      
                                             $cordovaSpinnerDialog.show("正在下载...","请稍候", true);
                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                              .then(function(result) {
                                                // Success!
                                                    alert('文件下载成功');
                                                      $cordovaFileOpener2.open(
                                                        '/sdcard/阿震做的app/xinhua1.2.apk'
                                                        
                                                      ).then(function() {
                                                          // Success!
                                                      }, function(err) {
                                                          // An error occurred. Show a message to the user
  });
                                              }, function(err) {
                                                // Error
                                                    alert('文件下载失败');
                                              }, function (progress) {
                                                $timeout(function () {
                                                  $scope.downloadProgress = Math.floor((progress.loaded / progress.total) * 100);
                                                  if($scope.downloadProgress==100){$cordovaSpinnerDialog.hide();};
                                                });
                                              });
                                              
                                  } else {
                                    //不进行下载
                                  }
                                });
                              
                        }
                        else{
                            alert('当前版本为'+$scope.nowVersion+'已经是最新版本');
                        }
                })
                    .error(function(data) {alert('error');});
                 
            };
          
         })
               
        .controller('regCtrl',function($scope,$http){
            $scope.email="";
            $scope.username="";
            $scope.user={name:"",password:"",passwordr:""};
            $scope.regLink=function(){
                  $http({method:'POST',url:'http://119.29.223.196/api.php',
                            data:{username:$scope.user.name,password:$scope.user.password}})
                                .success(function(res){
                                   alert('成功');
                                })
                                .error(function(res){alert('error');})
                                          
            }
            $scope.regRefresh=function(){
                $scope.$watch($scope.user.name,function(newVal){
                    $scope.user.name=newVal;
                });
                $scope.$watch($scope.user.password,function(newVal){
                    $scope.user.password=newVal;
                });
                 $scope.$watch($scope.user.passwordr,function(newVal){
                    $scope.user.passwordr=newVal;
                });
              
            }
            $scope.reg=function(){
                $scope.regRefresh();
                $scope.regLink();
            }
         })