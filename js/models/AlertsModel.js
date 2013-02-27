define([ 'backbone', 'globals', 'handler' ],
function(Backbone, globals, handler) {

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
            // initially bootstrap data, but silently
            this._loadAttributes(true);
        },

        /*
         * Handle CRUD operations using handler
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
        },

        resetAttributes: function() {
            var self = this;

            // if the notification is enabled, save the settings
            if (this.get('notifications') === globals.alerts.constants.ALERT_ENABLED) {
                return this._loadAttributes();
            }

            // otherwise it was initially enabled but now disabled, delete the settings
            this.destroy({
                callback: function() { self.set(self.defaults); }
            });
        },

        /*
         * Internal Methods
        */
        _loadAttributes: function(isSilent) {
            var self = this;

            function handleLoadedData(tx, results) {
                if (results.rows.length > 0) {

                    // set the member values with the record retrieved
                    self.set(
                        {
                            'notifications' : globals.alerts.constants.ALERT_ENABLED,
                            'location'      : results.rows.item(0).Location,
                            'fuelType'      : results.rows.item(0).FuelType,
                            'forecastChange': results.rows.item(0).ForecastChange
                        },
                        {
                            // don't broadcast this intial seeded data
                            // Backbone will listen and try to render
                            // and jQM views may not have been initialized yet
                            silent: isSilent || false
                        }
                    );
                }
                else {
                    self.set(self.defaults);
                }

                // assign an "id" so sync methods will be UPDATE/DELETE
                self.set({ id:1 });
            }

            // get the stored Forecast Alert settings, if any
            this.fetch({callback: handleLoadedData});
        },
    });


    return AlertModel;
});