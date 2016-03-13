//@@ Maps

var map;
var posObjArray = [{},{},{},{}];

function initMap() {

    google.maps.visualRefresh = true;

    // Default markers
    posObjArray[0].position = new google.maps.LatLng(37.3831663,-121.9972578);
    posObjArray[0].icon = "images/marker_green.png";
    posObjArray[1].position = new google.maps.LatLng(37.3817151,-121.9975511);
    posObjArray[1].icon = "images/marker_green.png";
    posObjArray[2].position = new google.maps.LatLng(37.3317121,-121.9978455);
    posObjArray[2].icon = "images/marker_green.png";
    posObjArray[3].position = new google.maps.LatLng(37.3891982,-121.9858969);
    posObjArray[3].icon = "images/marker_green.png";

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
                position: posObjArray[i].position,
                icon : posObjArray[i].icon,
                //animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(mapObj);
        }
    }
}