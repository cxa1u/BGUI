var map, posObjArray = [{}, {}, {}, {}];

//define global marker popup variable
var popup;
//define global geocoder object
var geocoder;
//define global markers array
var markers;
//define global DirectionsService object
var directionsService;
//define global DirectionsRenderer object
var directionsRenderer;





function initMap() {

    google.maps.visualRefresh = true;
    var mapOptions = {
        backgroundColor: "#CADFAA",
        center: new google.maps.LatLng(37.3831663, -121.9972578),
        zoom: 10,
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById('mapContainer');
    map = new google.maps.Map(mapElement, mapOptions);

    //initialize geocoder object
    geocoder = new google.maps.Geocoder();
    //initialize markers array
    markers = [];
    //initialize directionsService object
    directionsService = new google.maps.DirectionsService();
    //initialize directionsRenderer object
    directionsRenderer = new google.maps.DirectionsRenderer();
    //directionsRenderer will draw the directions on current
    //map
    directionsRenderer.setMap(map);
    //directionsRenderer will list the textual description of
    //the directions
    //on directionsDiv HTML element
    directionsRenderer.setPanel(document.getElementById('DirectionsListDiv'));


}

function listAddresses() {
    //get text input handler
    var addressField = document.getElementById('addressField');
    //get addressList <ul> element handle
    var addressList = document.getElementById('addressList');
    if (addressList.children.length == 0) {
        var placesText = document.getElementById('placesText');
        placesText.innerHTML = 'Places You Have Visited(Click on the place name to see on map):';
    }
    //create a list item
    var listItem = document.createElement('li');
    //get the text in the input element and make it a list
    //item
    listItem.innerHTML = addressField.value;
    listItem.addEventListener('click', function() {
        pinAddressOnMap(listItem.innerHTML);
    });
    //append it to the <ul> element
    addressList.appendChild(listItem);
    //call the geocoding function
    pinAddressOnMap(addressField.value);
    if (addressList.children.length > 1) {
        //get getDirectionsBtn button handler
        var getDirectionsBtn = document.getElementById('getDirectionsBtn');
        //enable the getDirectionsBtn
        getDirectionsBtn.disabled = false;
    }
    addressField.value = '';
}

function pinAddressOnMap(addressText) {
    //real essence, send the geocoding request
    geocoder.geocode({
            'address': addressText
        },
        function(results, status) {
            //if the service is working properly...
            if (status == google.maps.GeocoderStatus.OK) {
                //show the first result on map
                pinpointResult(results[0]);
            } else {
                alert('Cannot geocode because: ' + status);
            }
        });
}

function pinpointResult(result) {
    var marker = new google.maps.Marker({
        map: map,
        position: result.geometry.location,
        zIndex: -10
    });
    map.setCenter(result.geometry.location);
    map.setZoom(16);
    //infowindow stuff
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
        for (i = 1; i <= markers.length - 2; i++) {
            //add them to the waypnts array
            waypnts.push({
                location: markers[i].getPosition(),
                stopover: true
            });
        }
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
            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                alert('Cannot find directions because: ' +
                    status);
            }
        });
}