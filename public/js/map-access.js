//@@ Maps

var map;

function initMap() {

    google.maps.visualRefresh = true;


    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: new google.maps.LatLng(37.3831663,-121.9972578),
        zoom: 15,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            //Creating LatLng object with latitude and
            //longitude.
            var userLocation = new google.maps.LatLng(37.3831663,-121.9972578);
           // map.setCenter(userLocation);
           // map.setZoom(15);
            var posObjArray = [];
            posObjArray[0] = new google.maps.LatLng(37.3831663,-121.9972578);
            generateMarkers(posObjArray, map);
        });
    }
}


function generateMarkers(posObjArray, mapObj) {

    if (posObjArray.length && !$.isEmptyObject(mapObj)) {
        var i;
        for (i = 0; i < posObjArray.length; i++) {
            var marker = new google.maps.Marker({
                position: posObjArray[i],
                //animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(mapObj);
        }
    }
}