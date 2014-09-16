angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicSideMenuDelegate) {
        $.ajax({
            url: $mine.ajax.url('categories'),
            dataType: $mine.ajax.dataType,
            success: function(res, status, xhr){
                if(res.success){
                    $scope.categories = res.data;
                    $ionicSideMenuDelegate.canDragContent(false);
                }
            }
        });

    })

    .controller('CategoryCtrl', function ($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate, $timeout) {
        var hash = $stateParams.hash;
        var pageIndex = 1;
        var pageCount = 1;
        var updateSlider = function(){
            $ionicSlideBoxDelegate.update();
        };
        $scope.items = [];
        $scope.loginData = {};


        $.ajax({
            url: $mine.ajax.url('category'),
            data: {
                hash: hash
            },
            dataType: $mine.ajax.dataType,
            success: function(res, status, xhr){
                if(res.success){
                    $scope.category = res.data.category;
                    $scope.ads = res.data.ads;

                    $timeout(updateSlider, 100);
                }
            }
        });

        $scope.moreDataCanBeLoaded = function(){
            return pageIndex <= pageCount;
        };
        $scope.loadMore = function () {
            $.ajax({
                url: $mine.ajax.url('items'),
                data: {
                hash: hash,
                    pno: pageIndex
                },
                dataType: $mine.ajax.dataType,
                success: function(res, status, xhr){
                    if(res.success){
                        Array.prototype.push.apply($scope.items, res.data.data);
                        pageIndex = parseInt(res.data.pno) + 1;
                        pageCount = res.data.pageCount;
                    }
                },
                complete:function(){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        };

        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });


        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openLogin = function() {
            $scope.modal.show();
        };
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };
        $scope.doLogin = function() {
            this.closeLogin();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
    })

    .controller('ItemCtrl', function ($scope, $stateParams, $ionicScrollDelegate) {
        var hash = $stateParams.hash;
        var pageIndex = 1;
        var pageCount = 1;
        $scope.comments = [];
        $scope.comment = '';
        $.ajax({
            url: $mine.ajax.url('item'),
            data: {
                id: $stateParams.id
            },
            dataType: $mine.ajax.dataType,
            success: function(res, status, xhr){
                if(res.success){
                    $scope.$apply(function () {
                        $scope.category = res.data.category;
                        $scope.item = res.data.item;
                    });
                }
            }
        });

        $scope.moreDataCanBeLoaded = function(){
            return pageIndex <= pageCount;
        };
        $scope.loadMore = function () {
            $.ajax({
                url: $mine.ajax.url('item/comments'),
                data: {
                    id: $stateParams.id,
                    pno: pageIndex
                },
                dataType: $mine.ajax.dataType,
                success: function(res, status, xhr){
                    if(res.success){
                        Array.prototype.push.apply($scope.comments, res.data.data);
                        pageIndex = parseInt(res.data.pno) + 1;
                        pageCount = res.data.pageCount;
                    }
                },
                complete:function(){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        };

        $scope.$on('stateChangeSuccess', function () {
            $scope.loadMore();
        });
        $scope.sendComment = function(){
            $.ajax({
                type: 'POST',
                url: $mine.ajax.url('item/comment'),
                data: {
                    id: $scope.item._id,
                    content: $scope.comment
                },
                dataType: 'json',
                success: function(res, status, xhr){
                    if(res.success){
                        $scope.comments.unshift(res.data);
                        $scope.comment = '';
                        $ionicScrollDelegate.scrollBottom(true);
                    }
                }
            });
        };
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('TestCtrl', function ($scope, $stateParams, $http, $ionicBackdrop, $timeout, $ionicLoading) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        $http({method: 'GET', url: 'data/data.json', data: $stateParams})
            .success(function (data) {
                $scope.data = data;
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            })
            .error(function (data) {
            });


//    $ionicBackdrop.retain();
//    $timeout(function() {
//        $ionicBackdrop.release();
//    }, 1000);


    });
