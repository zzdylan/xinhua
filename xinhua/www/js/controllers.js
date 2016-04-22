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
   
        .controller('menuCtrl',function($scope,$ionicSideMenuDelegate,$cordovaCamera){
                $scope.toggleLeftSideMenu = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };
                $scope.takePhoto=function(){
                   var options = {
                                                                 //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
        quality: 100,                                            //相片质量0-100
        destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
        sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        allowEdit: false,                                        //在选择之前允许修改截图
        encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
        targetWidth: 200,                                        //照片宽度
        targetHeight: 200,                                       //照片高度
        mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true                                   //保存进手机相册
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        CommonJs.AlertPopup(imageData);
        var image = document.getElementById('myImage');
        image.src=imageData;
        //image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
        // error
        CommonJs.AlertPopup(err.message);
    });
                }
        })
        
    
        .controller('versionCtrl',function($scope,$cordovaFileTransfer,$cordovaFile,$http,$ionicPopup,$timeout,$cordovaProgress){
            $scope.user='1.0';
            $scope.refresh=function(){ 
                $cordovaProgress.showBar(true, 50000);
                $http.get('http://zz527844046.kpyun-1.cc/go.json')
                    .success(function(data) {
                       
                        $scope.nowVersion=data.appVersion;
                        if($scope.nowVersion!=$scope.user){
                             
                                var confirmPopup = $ionicPopup.confirm({
                                  title: '当前最新版本为'+$scope.nowVersion,
                                  template: '是否更新?'
                                });
                                confirmPopup.then(function(res) {
                                  if(res) {
                                            var url = "http://zz527844046.kpyun-1.cc/xinhua1.1.apk";
                                            var targetPath = cordova.file.externalRootDirectory+'阿震做的app/' + "xinhua1.1.png";
                                            var trustHosts = true;
                                            var options = {};
                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                              .then(function(result) {
                                                // Success!
                                                    alert('文件下载成功');
                                              }, function(err) {
                                                // Error
                                                    alert('文件下载失败');
                                              }, function (progress) {
                                                $timeout(function () {
                                                  $scope.downloadProgress = Math.floor((progress.loaded / progress.total) * 100);
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
                    .error(function(data) {alert('no');});
                 
            }
          
         })