angular.module('BGUI').factory('homeService', [ function() {
        return {       
        	interpolateIcons : function(storeArray){
        		angular.forEach(storeArray, function(location, index){
        			if(location.openNow){
        				if(location.timeUntilClose.hours < 1){
        					location.iconPath = "images/marker_yellow.png";	
        				}else{
        					location.iconPath = "images/marker_green.png";	
        				}
        			}else{
        				location.iconPath = "images/marker_red.png";
        			}
        		});
        		return storeArray;
        	}

        };
    }
]);