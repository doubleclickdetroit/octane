define([ 'globals', 'backbone', 'handler' ],
function(globals, Backbone, handler) {

    'use strict';


    var AlertModel;
    AlertModel = Backbone.Model.extend({

        defaults: {
            'notifications' : globals.alerts.constants.ALERT_DISABLED,
            'location'      : globals.alerts.constants.LOCATION,
            'fuelType'      : globals.alerts.constants.DEFAULT_FUEL_TYPE,
            'forecastChange': globals.alerts.constants.DEFAULT_FORECAST_CHANGE
        },

        sync: function(method, model) {
            console.log('sync', arguments);
        },

        setDefaults: function() {
            this.set(this.defaults);
        },

        initialize: function() {
            var self = this;

            // get the stored Forecast Alert settings, if any
            handler.getForecastAlert(function(results) {
                if (results.length > 0) {

                    // set the member values with the record retrieved
                    self.set({
                        'notifications' : globals.alerts.constants.ALERT_ENABLED,
                        'location'      : results.item(0).Location,
                        'fuelType'      : results.item(0).FuelType,
                        'forecastChange': results.item(0).ForecastChange
                    });
                }
                else {
                    self.setDefaults();
                }
            });
        }
    });


    return AlertModel;
});