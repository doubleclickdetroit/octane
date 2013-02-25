define([ 'globals', 'backbone' ],
function(globals, Backbone) {

    'use strict';


    var AlertModel;
    AlertModel = Backbone.Model.extend({

        defaults: {
            'location'      : globals.alerts.constants.LOCATION,
            'fuelType'      : globals.alerts.constants.DEFAULT_FUEL_TYPE,
            'forecastChange': globals.alerts.constants.DEFAULT_FORECAST_CHANGE
        }
    });


    return AlertModel;
});