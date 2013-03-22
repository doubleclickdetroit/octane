define([ 'models/LocationModel' ],
function(LocationModel) {

    'use strict';


    var LocationController;
    LocationController = (function() {

        var locationModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function LocationController() {}
        LocationController.prototype.init = function(delegate) {
            locationModel = new LocationModel();
            locationModel.on('all', delegate);
        };

        /*
         * Public Methods
        */
        LocationController.prototype.locateFromAddress = function(address) {
            locationModel
                .set(locationModel.defaults, {silent:true})
                .locateFromAddress(address);
        };

        LocationController.prototype.locateFromCurrentLocation = function() {
            locationModel
                .set(locationModel.defaults, {silent:true})
                .locateFromCurrentLocation();
        };

        return LocationController;
    })();


    return new LocationController();
});