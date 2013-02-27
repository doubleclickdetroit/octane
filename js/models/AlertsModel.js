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

        initialize: function() {
            var self = this;

            function bootstrapModelData(tx, results) {
                console.log('AlertModel initialize results', results);

                if (results.rows.length > 0) {
                    console.log('AlertModel initialize has results');

                    // set the member values with the record retrieved
                    self.set({
                        'notifications' : globals.alerts.constants.ALERT_ENABLED,
                        'location'      : results.rows.item(0).Location,
                        'fuelType'      : results.rows.item(0).FuelType,
                        'forecastChange': results.rows.item(0).ForecastChange
                    }, {silent: true});
                }
                else {
                    console.log('AlertModel initialize no results');
                    self.save(self.defaults);
                }

                self.set({ id:1 });
            }

            // get the stored Forecast Alert settings, if any
            this.fetch({ callback:bootstrapModelData });
        },

        /*
         * SYNC
        */
        sync: function (method, model, options) {
            options.callback = options.callback || null;

            switch(method) {
                case 'create':
                case 'update':
                    handler.setForecastAlert(model.toJSON(), options.callback);
                    break;
                case 'read':
                    handler.getForecastAlert(options.callback);
                    break;
                case 'delete':
                    handler.deleteForecastAlert(options.callback);
                    break;
            }
        },

        /*
         * Public Methods
        */
        updateAttribute: function(key, val) {
            switch(key) {
                case 'forecastAlertSlider': key = 'notifications'; break;
                case 'alertLocation'      : key = 'location'; break;
                case 'alertFuelType'      : key = 'fuelType'; break;
                case 'alertForecastChange': key = 'forecastChange'; break;
            }

            this.set(key, val);
        }
    });


    return AlertModel;
});