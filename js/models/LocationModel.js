define([ 'utils', 'globals', 'backbone', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(utils, globals, Backbone) {

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
                    console.log('getCurrentPosition ERROR', err.message);
                    setTimeout(function() {
                        console.log('getCurrentPosition trying again...');
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
                    callback.call(context || window, results);
                }
                else {
                    // alert('Geocode was not successful for the following reason: ' + status);
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

            //
            this.trigger('loadingstart');

            doGeocoding(conf, function(results) {
                //
                this.set({
                    'location' : results[0].formatted_address,
                    'latitude' : results[0].geometry.location.lat(),
                    'longitude': results[0].geometry.location.lng()
                });

                //
                this.trigger('loadingend');
            }, this);
        };

        LocationModel.prototype.locateFromCurrentLocation = function() {
            var conf = {};
            console.log('locateFromCurrentLocation BEGIN');

            // trigger loading event
            this.trigger('loadingstart');

            // get current position
            getCurrentPosition(function(coords) {
                conf.latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
                console.log('locateFromCurrentLocation getCurrentPosition');

                doGeocoding(conf, function(results) {
                    console.log('locateFromCurrentLocation END');
                    this.set(this.defaults, {silent:true});

                    // update attributes
                    this.set({
                        'location' : results[0].formatted_address,
                        'latitude' : results[0].geometry.location.lat(),
                        'longitude': results[0].geometry.location.lng()
                    });

                    // trigger loading event
                    this.trigger('loadingend');
                }, this);

            }, this);
        };

        return LocationModel;

    })(Backbone.Model);


    return LocationModel;
});