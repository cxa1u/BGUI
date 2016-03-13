//@@ Maps

var map;

var bluishStyle = [{
    stylers: [{
        hue: "#4C5F2A"
    }, {
        saturation: -5
    }, {
        lightness: -40
    }]
}, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
        lightness: 100
    }, {
        visibility: "simplified"
    }]
}, {
    featureType: "water",
    elementType: "geometry",
    stylers: [{
        hue: "#0000FF"
    }, {
        saturation: -40
    }]
}, {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#E80000"
    }, {
        weight: 1
    }]
}, {
    featureType: "road",
    elementType: "labels.text",
    stylers: [{
        // visibility: "off"
    }]
}, {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{
        color: "#7C512E"
    }, {
        weight: 2
    }]
}];

function initMap() {
    console.log(google.maps)

    google.maps.visualRefresh = true;

    var bluishStyledMap = new google.maps.StyledMapType(bluishStyle, {
        //name: "BITEGATE MAPS"
    });


    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: new google.maps.LatLng(51.508742,-0.120850),
        zoom: 10,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        styles: [bluishStyledMap],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);

    map.mapTypes.set('new_bluish_style', bluishStyledMap);
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            //Creating LatLng object with latitude and
            //longitude.
            var userLocation = new google.maps.LatLng(51.508742,-0.120850);
           // map.setCenter(userLocation);
           // map.setZoom(15);
            var posObjArray = [];
            posObjArray[0] = new google.maps.LatLng(51.508742,-0.120850);
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