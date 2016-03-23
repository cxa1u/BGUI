//@@ Maps

var map, posObjArray = [{}, {}, {}, {}];

var geocoder, popup;

function initMap() {

    google.maps.visualRefresh = true;

    // Default markers
    posObjArray[0].position = new google.maps.LatLng(37.3831663, -121.9972578);
    posObjArray[0].icon = "images/marker_green.png";
    posObjArray[1].position = new google.maps.LatLng(37.3817151, -121.9975511);
    posObjArray[1].icon = "images/marker_green.png";
    posObjArray[2].position = new google.maps.LatLng(37.3317121, -121.9978455);
    posObjArray[2].icon = "images/marker_green.png";
    posObjArray[3].position = new google.maps.LatLng(37.3891982, -121.9858969);
    posObjArray[3].icon = "images/marker_green.png";

    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: new google.maps.LatLng(37.3831663, -121.9972578),
        zoom: 10,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);
    //generateMarkers(posObjArray, map);
    geocoder = new google.maps.Geocoder();
    popup = new google.maps.InfoWindow();
    initGlb();
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
}


$("#listAddressBtn").on("click", initGeo);


function initGeo() {

    //get text input handler
    var addressField = document.getElementById('addressField');
    //get addressList <ul> element handle
    var addressList = document.getElementById('addressList');
    if (addressList.children.length === 0) {
        var placesText = document.getElementById('placesText');
        placesText.innerHTML = 'Places You Have Visited(Click on the place name to see on map):';
    }
    //create a list item
    var listItem = document.createElement('li');
    //get the text in the input element and make it a
    //list item
    listItem.innerHTML = addressField.value;
    listItem.addEventListener('click', function() {
        geocodeAddress(listItem.innerHTML);
    });
    //append it to the <ul> element
    addressList.appendChild(listItem);
    //call the geocoding function
    geocodeAddress(addressField.value);
}

function geocodeAddress(addressText) {
    //real essence, send the geocoding request
    geocoder.geocode({
        'address': addressText
    }, function(results, status) {
        //if the service is working properly...
        if (status == google.maps.GeocoderStatus.OK) {
            //show the first result on map

            console.log(results);

            pinpointResult(results[0]);
        } else {
            alert('Cannot geocode because: ' + status);
        }
    });
}

function pinpointResult(result) {
    var marker = new google.maps.Marker({
        map: map,
        position: result.geometry.location
    });
    map.setCenter(result.geometry.location);
    map.setZoom(16);
    //infowindow stuff
    google.maps.event.addListener(marker, 'click', function() {


        var popupContent = '<b>Address: </b> ' +
            result.formatted_address;
        popup.setContent(popupContent);
        popup.open(map, this);
    });
}



function initGlb() {

console.log(google.maps.drawing);


    var drawingManager = new google.maps.drawing.DrawingManager({
        //initial drawing tool to be enabled, we want to be in
        //no drawing mode at start
        drawingMode: null,
        //enable the drawingControl to be seen in the UI
        drawingControl: true,
        //select which drawing modes to be seen in the
        //drawingControl and position the drawingControl itself
        drawingControlOptions: {
            //select a control position in the UI
            position: google.maps.ControlPosition.TOP_CENTER,
            //selected drawing modes to be seen in the control
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER
            ]
        }
    });

    drawingManager.setMap(map);


    // wait for marker complete event"
    google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
       

        alert("track")

        //get the LatLng object of the marker, it is necessary
        //for the geocoder
        var markerPosition = marker.getPosition();
        //reverse geocode the LatLng object to return the
        //addresses
        geocoder.geocode({
                'latLng': markerPosition
            },
            function(results, status) {
                //if the service is working properly...
                if (status == google.maps.GeocoderStatus.OK) {
                    //Array of results will return if everything
                    //is OK
                    if (results) {
                        //infowindow stuff
                        showAddressOfResult(results[0], marker);
                    }
                }
                //if the service is not working, deal with it
                else {
                    alert('Reverse Geocoding failed because: ' +
                        status);
                }
            });
    });
}



function showAddressOfResult(result, marker) {
//set the center of the map the marker position
    map.setCenter(marker.getPosition());
    map.setZoom(13);
//create the InfoWindow content
    var popupContent = '<b>Address: </b> ' +result.formatted_address;
//set the InfoWindow content and open it
    popup.setContent(popupContent);
    popup.open(map, marker);
}