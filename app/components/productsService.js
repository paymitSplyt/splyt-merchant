"use strict";

angular
    .module("myApp")
    .factory("productsService", ["$http", function productsService($http) {

        return {
            getProducts: function () {
                return $http.get('products.json');
            }
        };
    }]);