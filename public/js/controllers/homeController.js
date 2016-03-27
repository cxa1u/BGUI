/**
 * @ngdoc function
 * @name ufaasApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the ufaasApp
 */
angular.module('BGUI').controller('HomeController', ['apiService', 'geoHandler', '$scope','mapHandler',
    function(apiService, geoHandler, $scope, mapHandler) {

        var self = this,
            positionArray = [];
        this.zipCode = "";
        this.storeLocations = [];

        geoHandler.intializeMap(function(userPosition) {
            geoHandler.getAddressByLatLng(userPosition, function(addressObj) {
                console.log(addressObj);
                $scope.$apply(function() {
                    self.zipCode = addressObj.postal_code;
                    self.city = addressObj.locality;
                    self.state = addressObj.administrative_area_level_1;
                    //Initial render
                    self.renderStores(self.zipCode);
                });
            });
        });


        this.searchStoresByZip = function(zipCode) {
           if($.trim(zipCode)){


            self.renderStores(self.zipCode);

            return;

            geoHandler.markCurrentPosition(function(userPosition){
                geoHandler.getAddressByLatLng(userPosition, function(addressObj) {
                console.log(addressObj);
                    $scope.$apply(function() {
                        self.city = addressObj.locality;
                        self.state = addressObj.administrative_area_level_1;
                        //Initial render
                        self.renderStores(self.zipCode);
                    });
                });
            });
            self.renderStores(zipCode);
           }else{
                console.info("Please enter valid zipcode")
           }  
        }



        this.renderStores = function(zipcode){
            
                
                apiService.getStoresByZip(zipcode, function(storeData) {
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






        this.searchStores2 = function(zipcode) {

            //if($.trim(zipcode)){

            if (true) {
                apiService.getStoreLocations("12", function(storeData) {
                    console.log(storeData);

                    if (storeData.restaurants.length) {
                        self.storeLocations = storeData.restaurants;
                        var i;
                        for (i = 0; i < storeData.restaurants.length; i++) {

                            var lat = storeData.restaurants[i].address.geoCode.latitude;
                            var lng = storeData.restaurants[i].address.geoCode.longitude;
                            positionArray.push({
                                position: new google.maps.LatLng(lat, lng),
                                icon: "images/marker_green.png"
                            });
                            storeData.restaurants[i].marker = generateMarkers(positionArray, map);
                        }
                    }
                });
            } else {
                console.info("Please enter zipcode");
            }
        };


        this.renderDirectionLine = function(lat, lng, marker) {

            console.log(marker);
            // var latLngObj = new google.maps.LatLng(lat, lng);

            // var marker = new google.maps.Marker({
            //     position: latLngObj,
            //     icon: "images/marker_green.png",
            //     //animation: google.maps.Animation.BOUNCE
            // });

            geocoder.geocode({
                    'latLng': marker.position
                },
                function(results, status) {
                    //if the service is working properly...
                    if (status == google.maps.GeocoderStatus.OK) {
                        //show the first result on map
                        markers.length = 1;
                        pinpointResult(results[0], marker);
                        getDirections()
                    } else {
                        alert('Cannot geocode because: ' + status);
                    }
                });

        };






    }
]);