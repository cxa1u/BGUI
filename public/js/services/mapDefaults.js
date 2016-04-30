angular.module('BGUI').factory('mapDefaults', [

    function() {
        return {
            config: {
                backgroundColor: "#CADFAA",
                center: new google.maps.LatLng(37.7784486, -122.4144917),
                zoom: 6,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            iconSet: {
            	blue : "/images/current-position.png"
            }
        }
    }
]);