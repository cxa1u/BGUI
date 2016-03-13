//@@ Maps

var map;

function initMap() {
    console.log(google.maps)

    google.maps.visualRefresh = true;

    var mapOptions = {
        center: new google.maps.LatLng(39.9078, 32.8252),
        zoom: 15,
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
            var userLocation = new google.maps.LatLng(lat, lng);
            map.setCenter(userLocation);
            map.setZoom(15);
            //map.setTilt(180);
        });
    }
}