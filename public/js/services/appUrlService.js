angular.module('ufaasApp').factory('appUrlService', [ function() {

    
        
        console.log("hello");

        return {
        	getStoreLocations : "/getStoreLocations",
        	getStoreInfo : "/getStoreInfo"
        };
    }
]);