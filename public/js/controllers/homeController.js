/**
 * @ngdoc function
 * @name ufaasApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the ufaasApp
 */
angular.module('BGUI').controller('HomeController', ['apiService', 'geoHandler', '$scope', 'mapHandler',
    function(apiService, geoHandler, $scope, mapHandler) {

        var self = this;
        this.positionArray = [];
        this.advSearchParams = {

        };
        this.zipCode = "";
        this.storeLocations = [];
        this.isCollapsed = true;
        this.distanceTitle = 'Select';
        this.distanceSet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "20"];

        geoHandler.intializeMap(function(userPosition) {
            geoHandler.getAddressByLatLng(userPosition, function(addressObj) {
                $scope.$apply(function() {
                    self.zipCode = addressObj.postal_code;
                    self.city = addressObj.locality;
                    self.state = addressObj.administrative_area_level_1;

                    self.advSearchParams['zipCode'] = addressObj.postal_code;
                    self.advSearchParams['city'] = addressObj.locality;
                    self.advSearchParams['state'] = addressObj.administrative_area_level_1;
                    //Initial render
                    self.renderStores(self.zipCode);
                });
            });
        });

        this.setDefaultDistance = function(e) {
            e.preventDefault();
            this.distanceTitle = "Select";
            this.updateSearchParams('distance', "");
        };

        this.setDistance = function(event, selectedDistance) {
            event.preventDefault();
            this.distanceTitle = selectedDistance;
            this.updateSearchParams('distance', selectedDistance);
        };

        this.searchStoresByZip = function(zipCode) {
            zipCode =Number($.trim(zipCode)); 
            if (zipCode) {
                self.renderStores(zipCode);
            } else {
                console.info("Please enter valid zipcode")
            }
        }



        this.renderStores = function(zipcode) {
            apiService.getStoresByZip(zipcode, function(storeData) {
                
              var restaurants, positionArray=[];
                self.storeLocations = 0;
                if (storeData.restaurants.length) {
                    self.storeLocations = restaurants = storeData.restaurants;
                    var i;
                    for (i = 0; i < restaurants.length; i++) {

                        var lat = restaurants[i].address.geoCode.latitude;
                        var lng = restaurants[i].address.geoCode.longitude;
                        positionArray.push({
                            position: new google.maps.LatLng(lat, lng),
                            icon: "images/marker_green.png"
                        });
                        //storeData.restaurants[i].marker = generateMarkers(positionArray, map);
                    }
                    geoHandler.generateMarkers(positionArray, mapHandler.map);
                    geoHandler.focusLocation(mapHandler.map, positionArray[0].position);
                }
            });
        };


        this.updateSearchParams = function(key, value) {
            if (value) {
                this.advSearchParams[key] = value;
            } else {
                delete this.advSearchParams[key];
            }
        }


        this.handleAdvancedSearch = function() {
            apiService.searchStores(this.advSearchParams, function(storeData) {

                if (storeData.length) {
                    self.storeLocations = storeData;
                    var i;
                    for (i = 0; i < storeData.length; i++) {
                        var lat = storeData[i].address.geoCode.latitude;
                        var lng = storeData[i].address.geoCode.longitude;
                        positionArray.push({
                            position: new google.maps.LatLng(lat, lng),
                            icon: "images/marker_green.png"
                        });
                        //storeData.restaurants[i].marker = generateMarkers(positionArray, map);
                    }
                    geoHandler.generateMarkers(positionArray, mapHandler.map);
                    geoHandler.focusLocation(positionArray[0].position);
                }
            });
        }

    }
]);