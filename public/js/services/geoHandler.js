angular.module('BGUI').factory('geoHandler', ['mapHandler', 'mapDefaults', function(mapHandler, mapDefaults) {

    return {

        markers : [],
        intializeMap: function(cb) {
            var mapOptions = mapDefaults.config,
            mapElement = document.getElementById('mapContainer');
            mapHandler.map = new google.maps.Map(mapElement, mapOptions);
            
            var geoAsyncCtrl = window.setTimeout(function() {
                handleNoGeolocation(mapOptions.center);
                cb(mapOptions.center);
            }, 4000);

            if (navigator.geolocation) {
            
                navigator.geolocation.getCurrentPosition(function(position) {
                    window.clearTimeout(geoAsyncCtrl);
                    var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    mapHandler.marker = new google.maps.Marker({
                        position: userPosition,
                        icon: mapDefaults.iconSet.green,
                    });
                    mapHandler.marker.setMap(mapHandler.map);
                    mapHandler.map.setCenter(userPosition);
                    mapHandler.map.setZoom(15);
                    cb(userPosition);
                }, function() {
                    window.clearTimeout(geoAsyncCtrl);
                    handleNoGeolocation(mapOptions.center);
                    cb(mapOptions.center);
                });
            }
            // Browser doesn't support Geolocation
            else {
                handleNoGeolocation(mapOptions.center);
                cb(mapOptions.center);
            }

            function handleNoGeolocation(position) {
                mapHandler.marker = new google.maps.Marker({
                    position: position,
                    icon: "/images/current-position.png",
                });
                mapHandler.marker.setMap(mapHandler.map);
                mapHandler.map.setCenter(position);
                mapHandler.map.setZoom(15);
            }
        },


        markCurrentPosition : function(cb){
                navigator.geolocation.getCurrentPosition(function(position) {
                    var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    mapHandler.marker.setMap(null);
                    mapHandler.marker = new google.maps.Marker({
                        position: currentPosition,
                        icon: "/images/current-position.png",
                    });
                    mapHandler.marker.setMap(mapHandler.map);
                    mapHandler.map.setCenter(currentPosition);
                    mapHandler.map.setZoom(15);
                    cb(currentPosition);
                }, function() {
                    console.error("Something went wrong :: Please try again.");
                });
        },



        getAddressByLatLng: function(LatLngObj, cb) {
            var geocoder = new google.maps.Geocoder();
            var latlng = LatLngObj;
            var address = {};

            geocoder.geocode({
                    'latLng': latlng
                }, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {

                            for (var i = 0; i < results[0].address_components.length; i++) {
                                var types = results[0].address_components[i].types;

                                    address[types[0]] = results[0].address_components[i].long_name;



                                for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                                    
                                    if (types[typeIdx] == 'postal_code') {
                                        //cb(results[0].address_components[i].short_name);
                                    }
                                }
                            }
                            cb(address);
                        } else {
                            console.info("No records are found");
                            cb(address);
                        }
                    }
                });
            },


            generateMarkers : function(positionArray, map){

                this.resetMarkers(this.markers, null);

                if (positionArray.length && !$.isEmptyObject(map)) {
                    var i;
                    for (i = 0; i < positionArray.length; i++) {
                        var marker = new google.maps.Marker({
                            position: positionArray[i].position,
                            icon: positionArray[i].icon,
                            //animation: google.maps.Animation.BOUNCE
                        });
                        marker.setMap(map);
                        this.markers.push(marker);
                    }
                }
            },


            resetMarkers : function(markersArray, map){
                  for (var i = 0; i < markersArray.length; i++) {
                     markersArray[i].setMap(map);
                  }
            },


            focusLocation : function(LatLngObj) {
                mapHandler.map.setCenter(LatLngObj);
                mapHandler.map.setZoom(15);
            }

        }
    }
]);