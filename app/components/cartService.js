"use strict";

angular
    .module("myApp")
    .factory("cartService", ["$resource", "$http", function cartService($resource, $http) {
        var url = "http://172.16.10.133:8080/";
        return {
            createNewCart: function (merchantId) {
                var newCartsResource = $resource(url + "Cart");
                return newCartsResource.save({merchantId: merchantId}, null);
            },
            getCarts: function (merchantId) {
                var cartsResource = $resource(url + "Cart");
                return cartsResource.query({merchantId: merchantId});
            },
            getCart: function (cartId) {
                var cartResource = $resource(url + "Cart/" + cartId);
                return cartResource.get();
            },
            addItemToCart: function (cartId, product) {
                var data = {
                    post: function (description, price, amount) {
                        return {'description': description, 'price': price, 'amount': amount};
                    }
                };
                return $http.post(url + "Cart/" + cartId + "/Item",
                    data.post(product.description, product.price, 1));
            },
            subtractItemFromCart: function (item) {
                var data = {
                    post: function (description, price, amount) {
                        return {'description': description, 'price': price, 'amount': amount};
                    }
                };
                return $http.put(url + "Cart/Item/" + item.id,
                    data.put(item.description, item.price, item.amount--));
            },
            removeItemFromCart: function (itemId) {
                return $http.delete(url + "Cart/Item/" + itemId);
            }
        };
    }]);