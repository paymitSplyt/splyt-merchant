'use strict';

angular.module('myApp')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/entry', {
            templateUrl: 'entry/entry.html',
            controller: 'EntryController'
        });
    }])

    .controller('EntryController', ["$scope", "$rootScope", "productsService", "$location", function($scope, $rootScope, productsService, $location) {
        $scope.merchantId = 1;

        $scope.goToCarts = function(){
            $rootScope.merchantId = $scope.merchantId;
            $location.path("/carts");
        };

        $scope.loadProducts = function () {
            productsService.getProducts().success(function(data){
                $rootScope.products = data.products;
            });

        };
        $scope.loadProducts();
    }]);