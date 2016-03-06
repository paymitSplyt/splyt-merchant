'use strict';

angular.module('myApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/carts', {
            templateUrl: 'carts/carts.html',
            controller: 'CartsController'
        });
    }])

    .controller('CartsController', ["$scope", "$rootScope", "$location", "$http", "$route", "notificationService", "cartService", function ($scope, $rootScope, $location, $http, $route, notificationService, cartService) {
        notificationService.receiveNotification(function () {
            $route.reload();
        });
        $scope.loadCarts = function () {
            $scope.carts = cartService.getCarts($scope.merchantId);
        };
        $scope.loadCarts();

        $scope.createNewCart = function () {
            cartService.createNewCart($scope.merchantId).$promise.then(function(){
                $route.reload();
            });
        };

        $scope.goToCart = function (cartId) {
            $rootScope.activeCartId = cartId;
            $location.path("/cart")
        };
    }]);