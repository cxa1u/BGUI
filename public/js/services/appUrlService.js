angular.module('BGUI').factory('appUrlService', [function() {

        return {
        	baseHost : "http://api.bitegate.net/v1",
        	stores: "/restaurants",
        	getStoreLocations : "/getStoreLocations",
        	getStoreInfo : "/getStoreInfo",
        	getStoresByZip: "/getStoreLocations",       //http://api.bitegate.net/v1/restaurants"
        	searchStores: '/searchStores', //http://api.bitegate.net/v1/restaurants
        	get : function(path){
        		return this.baseHost+this[path];
        	}
        };
    }
]);