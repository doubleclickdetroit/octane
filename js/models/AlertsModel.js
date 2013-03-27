define([ 'globals', 'utils', 'backbone', 'managers/AlertsDatabaseManager' ],
function(globals, utils, Backbone, AlertsDatabaseManager) {

    'use strict';


    var AlertModel;
    AlertModel = (function(_super) {

        /*
         * Private Methods
        */
        function handleLoadedData(tx, results) {
            if (results.rows.length > 0) {
                // set the member values with the record retrieved
                this.set({
                    'notifications' : globals.alerts.constants.ALERT_ENABLED,
                    'location'      : results.rows.item(0).Location,
                    'fuelType'      : results.rows.item(0).FuelType,
                    'forecastChange': results.rows.item(0).ForecastChange
                });
            }
            else {
                this.set(this.defaults);
            }

            // assign "id" so sync methods will be UPDATE/DELETE
            this.set({id: 1});
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(AlertModel, _super);

        function AlertModel() {
            AlertModel.__super__.constructor.apply(this, arguments);
        }

        AlertModel.prototype.defaults = {
            'notifications' : globals.alerts.constants.ALERT_DISABLED,
            'location'      : globals.alerts.constants.LOCATION,
            'fuelType'      : globals.alerts.constants.DEFAULT_FUEL_TYPE,
            'forecastChange': globals.alerts.constants.DEFAULT_FORECAST_CHANGE
        };

        AlertModel.prototype.initialize = function() {
            // initially bootstrap data
            this.loadAttributes();
        };

        // Handle CRUD operations using AlertsDatabaseManager
        AlertModel.prototype.sync = function (method, model, options) {
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
        };

        /*
         * Public Methods
        */
        AlertModel.prototype.loadAttributes = function() {
            var self = this;

            // get the stored Forecast Alert settings, if any
            this.fetch({
                callback: function() {
                    // set context and [arguments]
                    handleLoadedData.apply(self, arguments);
                }
            });
        };

        AlertModel.prototype.updateAttribute = function(key, val) {
            switch(key) {
                case 'forecastAlertSlider': key = 'notifications';  break;
                case 'alertLocation'      : key = 'location';       break;
                case 'alertFuelType'      : key = 'fuelType';       break;
                case 'alertForecastChange': key = 'forecastChange'; break;
            }

            this.set(key, val);
        };

        AlertModel.prototype.resetAttributes = function() {
            this.loadAttributes();
        };

        AlertModel.prototype.saveAttributes = function() {
            var self = this;

            // if the notification is enabled, save the settings
            if (this.get('notifications') === globals.alerts.constants.ALERT_ENABLED) {
                this.save();
            }

            // otherwise it was initially enabled but now disabled, delete the settings
            else {
                this.destroy({
                    callback: function() {
                        self.set(self.defaults);
                    }
                });
            }
        };

        return AlertModel;

    })(Backbone.Model);


    return AlertModel;
});