'use strict';

angular.module('myApp')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: 'cart/cart.html',
            controller: 'CartController'
        });
    }])

    .controller('CartController', ["$scope", "$route", "$location", "$http", "$window", "notificationService", "cartService", function ($scope, $route, $location, $http, $window, notificationService, cartService) {
        notificationService.receiveNotification(function () {
            $route.reload();
        });
        $scope.loadCart = function () {
            $scope.cart = cartService.getCart($scope.activeCartId);
        };
        $scope.loadCart();

        $scope.addItemToCart = function (product) {
            if ($scope.getCartIndex(product) < 0)
                cartService.addItemToCart($scope.activeCartId, product).then(function () {
                    $route.reload();
                });
        };

        $scope.removeItemFromCart = function (itemId) {
            cartService.removeItemFromCart(itemId).then(function () {
                $route.reload();
            });
        };

        $scope.subtractItemFromCart = function (item) {
            if (item.amount <= 1)
                cartService.removeItemFromCart(item.id).then(function () {
                    $route.reload();
                });
            else
                cartService.subtractItemFromCart(item).then(function () {
                    $route.reload();
                });
        };

        $scope.payItem = function (item) {
            if (item.paidAmount < item.amount)
                cartService.payItem(item.id).then(function () {
                    $route.reload();
                })
        };

        $scope.getCartIndex = function (product) {
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i] === product)
                    return i;
            }
            return -1;
        };

        $scope.goBack = function () {
            $window.history.back();
        }
    }]);