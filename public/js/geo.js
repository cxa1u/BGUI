/*var markers = [],
    geocoder = new google.maps.Geocoder(),
    popup = new google.maps.InfoWindow(),
    directionsService = new google.maps.DirectionsService(),
    //initialize directionsRenderer object
    directionsRenderer = new google.maps.DirectionsRenderer();


function intializeMap() {

    var initialLocation;
    var defLocation = new google.maps.LatLng(37.7784486, -122.4144917);
    var browserSupportFlag = new Boolean();

    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: defLocation,
        zoom: 6,
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);
    directionsRenderer.setMap(map);

    // Try W3C Geolocation (Preferred)
    if (navigator.geolocation) {

        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            //initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            var marker = new google.maps.Marker({
                position: defLocation,
                icon: "/images/current-position.png",
                //animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(map);
            markers.push(marker);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
    }
}


function generateMarkers(posObjArray, mapObj) {
    if (posObjArray.length && !$.isEmptyObject(mapObj)) {
        var i;
        for (i = 0; i < posObjArray.length; i++) {
            var marker = new google.maps.Marker({
                position: posObjArray[i].position,
                icon: posObjArray[i].icon,
                //animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(mapObj);
        }
    }

    return marker;

}



function pinpointResult(result, marker) {
          // map.setCenter(result.geometry.location);
          // map.setZoom(16);
            //infowindow stuff

            marker.setOptions({
              map: map,
                position: result.geometry.location,
                zIndex: -10
            }); 

            map.setCenter(result.geometry.location);
            map.setZoom(6);


            google.maps.event.addListener(marker, 'click',
                function() {
                    var popupContent = '<b>Address: </b> ' + result.formatted_address;
                    popup.setContent(popupContent);
                    popup.open(map, this);
                });
            markers.push(marker);

        }




function getDirections() {
    //define an array that will hold all the waypoints
    var waypnts = [];
    //define a directionsRequest object
    var directionRequest;
    //if there are stops other than the origin and the
    //final destination
    if (markers.length > 2) {
        // for (i = 1; i <= markers.length - 2; i++) {
        //     //add them to the waypnts array
        //     waypnts.push({
        //         location: markers[i].getPosition(),
        //         stopover: true
        //     });
        // }
        //prepare the directionsRequest by including
        //the waypoints property
        directionRequest = {
            origin: markers[0].getPosition(),
            destination: markers[markers.length - 1].getPosition(),
            waypoints: waypnts,
            travelMode: google.maps.TravelMode.DRIVING
        };
    } else {
        //this time, do not include the waypoints property as
        //there are no waypoints
        directionRequest = {
            origin: markers[0].getPosition(),
            destination: markers[markers.length - 1].getPosition(),
            travelMode: google.maps.TravelMode.DRIVING
        };
    }
    //send the request to the directionsService
    directionsService.route(directionRequest,
        function(result, status) {
            

          // var mark_leg = result.routes[ 0 ].legs[ 0 ];

          // makeMarker( leg.start_location, icons.start, "title" );
          // makeMarker( leg.end_location, icons.end, 'title' );


            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                alert('Cannot find directions because: ' +
                    status);
            }
        });
}


function makeMarker( position, icon, title ) {
   new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: title
   });
}*/