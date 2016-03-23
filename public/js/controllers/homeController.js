'use strict';

/**
 * @ngdoc function
 * @name ufaasApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the ufaasApp
 */
angular.module('ufaasApp').controller('HomeController', ['apiService',
    function(apiService) {

        var self = this,
            positionArray = [];

        this.zipcode = ""; //Default serch zipcode
        this.storeLocations = [];

        intializeMap();


        this.searchStores = function(zipcode) {

            console.log(generateMarkers);

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