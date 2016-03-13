//@@ Maps

var map;
var posObjArray = [];

function initMap() {

    google.maps.visualRefresh = true;

    // Default markers
    posObjArray[0] = new google.maps.LatLng(37.3831663,-121.9972578);
    posObjArray[1] = new google.maps.LatLng(37.3817151,-121.9975511);
    posObjArray[2] = new google.maps.LatLng(37.3317121,-121.9978455);
    posObjArray[3] = new google.maps.LatLng(37.3891982,-121.9858969);


    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: new google.maps.LatLng(37.3831663,-121.9972578),
        zoom: 10,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);
    generateMarkers(posObjArray, map);
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