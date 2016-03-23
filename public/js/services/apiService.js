angular.module('ufaasApp').factory('apiService', ['$http','appUrlService', function($http, appUrlService) {
        
        return {

        	getStoreLocations : function(zipcode, cb){
        		$http.get(appUrlService.getStoreLocations, {
                    params: {
                        zipcode: zipcode
                    }
                }).then(function(resp){
        			cb(resp.data);
        		});
        	},

        	getStoreInfo : function(storeId, cb){
        		$http.get(appUrlService.getStoreInfo, {
                    params : {
                        storeId: storeId
                    }
                }).then(function(resp){
        			cb(resp.data);
        		})
        	}
        }
    }
]);