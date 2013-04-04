define([ 'globals', 'utils', 'facade', 'backbone', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(globals, utils, facade, Backbone) {

    'use strict';


    var LocationModel;
    LocationModel = (function(_super) {

        var geocoder;

        /*
         * Private Methods
        */
        function getCurrentPosition(counter, callback, context) {
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    callback.call(context || window, true, pos.coords);
                },
                function(err) {
                    if (++counter < 3) {
                        setTimeout(function() {
                            getCurrentPosition(counter, callback, context);
                        }, 1000);
                    }
                    else {
                        var message = 'Unfortunately there was an error locating your position. Please try again.';
                        facade.publish('app', 'alert', message);
                        callback.call(context || window, false);
                    }
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
                    callback.call(context || window, true, results);
                }
                else {
                    var message = 'Unfortunately there was an error: ' + status + '. Please try again.';
                    facade.publish('app', 'alert', message);
                    callback.call(context || window, false);
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

            doGeocoding(conf, function(isSuccess, results) {
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
            getCurrentPosition(0, function(isSuccess, coords) {
                if (!isSuccess) {
                    // trigger loading event
                    this.trigger('loadingend');
                    this.trigger('fail');
                    return;
                }

                conf.latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

                doGeocoding(conf, function(isSuccess, results) {
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