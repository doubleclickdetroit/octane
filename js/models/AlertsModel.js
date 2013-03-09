define([ 'backbone', 'globals', 'managers/AlertsDatabaseManager' ],
function(Backbone, globals, AlertsDatabaseManager) {

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
            // initially bootstrap data
            this._loadAttributes();
        },

        /*
         * Handle CRUD operations using forecastManager
        */
        sync: function (method, model, options) {
            var manager = AlertsDatabaseManager.getInstance();
            options.callback = options.callback || null;

            switch(method) {
                case 'create':
                case 'update':
                    manager.setForecastAlert(model.toJSON(), options.callback);
                    break;
                case 'read':
                    manager.getForecastAlert(options.callback);
                    break;
                case 'delete':
                    manager.deleteForecastAlert(options.callback);
                    break;
            }
        },

        /*
         * Public Methods
        */
        updateAttribute: function(key, val) {
            switch(key) {
                case 'forecastAlertSlider': key = 'notifications';  break;
                case 'alertLocation'      : key = 'location';       break;
                case 'alertFuelType'      : key = 'fuelType';       break;
                case 'alertForecastChange': key = 'forecastChange'; break;
            }

            this.set(key, val);
        },

        resetAttributes: function() {
            this._loadAttributes();
        },

        saveAttributes: function() {
            var self = this;

            // if the notification is enabled, save the settings
            if (this.get('notifications') === globals.alerts.constants.ALERT_ENABLED) {
                this.save();
            }

            // otherwise it was initially enabled but now disabled, delete the settings
            else {
                this.destroy({
                    callback: function() { self.set(self.defaults); }
                });
            }
        },

        /*
         * Internal Methods
        */
        _loadAttributes: function() {
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
        }
    });


    return AlertModel;
});