angular.module('BGUI').factory('apiService', ['$http','appUrlService', function($http, appUrlService) {
        
        return {
            getStoresByZip: function(zipCode, cb) {
              $http.get(appUrlService.get('stores'), {
                    params : {
                        zipCode: zipCode
                    }
                }).then(function(resp){
                   cb(resp.data);
                })  
            },

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
                        storeId: storeId,

                    },
                }).then(function(resp){
        			cb(resp.data);
        		})
        	},



            getStoresByZipJsonp: function(zipCode, cb) {

              $http.jsonp(appUrlService.getStoresByZip, {
                    params : {
                        callback : "callback"
                       
                    },
                    headers: {
                        "accept":'application/x-javascript' 
                    }
                }).then(function(resp){
                   cb(resp.data);
                })  
            },

            searchStores : function(params, cb){
                $http.get(appUrlService.searchStores, {
                    params : params
                }).then(function(resp){
                    cb(resp.data);
                });;
            }

        }
    }
]);