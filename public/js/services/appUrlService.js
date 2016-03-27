angular.module('BGUI').factory('appUrlService', [function() {

    

        return {
        	getStoreLocations : "/getStoreLocations",
        	getStoreInfo : "/getStoreInfo",
        	getStoresByZip: "/getStoreLocations"       //http://api.bitegate.net/v1/restaurants"

        };
    }
]);