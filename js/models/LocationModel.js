define([ 'globals', 'utils', 'facade', 'backbone', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(globals, utils, facade, Backbone) {

    'use strict';


    var LocationModel;
    LocationModel = (function(_super) {

        var geocoder;

        /*
         * Private Methods
        */
        function getCurrentPosition(callback, context) {
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    callback.call(context || window, pos.coords);
                },
                function(err){
                    setTimeout(function() {
                        getCurrentPosition(callback, context);
                    }, 1000);
                },
                {
                    maximumAge        : 3000,
                    timeout           : 9000,
                    enableHighAccuracy: true
                }
            );
        }

        function doGeocoding(conf, callback, context) {
            geocoder.geocode(conf, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback.call(context || window, results, true);
                }
                else {
                    var message = 'Unfortunately there was an error: ' + status + '. Please try again.';
                    facade.publish('app', 'alert', message);
                    callback.call(context || window, results, false);
                }
            });
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(LocationModel, _super);

        function LocationModel() {
            LocationModel.__super__.constructor.apply(this, arguments);
            geocoder = new google.maps.Geocoder();
        }

        LocationModel.prototype.defaults = {
            'location' : null,
            'latitude' : null,
            'longitude': null
        };

        LocationModel.prototype.locateFromAddress = function(address) {
            var conf = {'address': address};

            // trigger loading event
            this.trigger('loadingbegin');

            doGeocoding(conf, function(results, isSuccess) {
                // trigger loading event
                this.trigger('loadingend');

                if (isSuccess) {
                    // update attributes
                    this.set({
                        'location' : results[0].formatted_address,
                        'latitude' : results[0].geometry.location.lat(),
                        'longitude': results[0].geometry.location.lng()
                    });
                }
                else {
                    this.trigger('fail');
                }
            }, this);

            return this;
        };

        LocationModel.prototype.locateFromCurrentLocation = function() {
            var conf = {};

            // trigger loading event
            this.trigger('loadingbegin');

            // get current position
            getCurrentPosition(function(coords) {
                conf.latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

                doGeocoding(conf, function(results, isSuccess) {
                    // trigger loading event
                    this.trigger('loadingend');

                    if (isSuccess) {
                        // update attributes
                        this.set({
                            'location' : results[0].formatted_address,
                            'latitude' : results[0].geometry.location.lat(),
                            'longitude': results[0].geometry.location.lng()
                        });
                    }
                    else {
                        this.trigger('fail');
                    }
                }, this);

            }, this);

            return this;
        };

        return LocationModel;

    })(Backbone.Model);


    return LocationModel;
});