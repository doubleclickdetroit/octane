define([ 'utils', 'backbone', 'globals', 'managers/ForecastDatabaseManager' ],
function(utils, Backbone, globals, ForecastDatabaseManager) {

    'use strict';


    var ForecastModel;
    ForecastModel = (function(_super) {

        utils.extend(ForecastModel, _super);

        /*
         * Private Methods
        */
        function requestUsingForecastDatabaseManager(callback) {
            var self = this;

            function response(tx, results) {
                if (results.rows.length > 0) {
                    self.set({
                        'location': results.rows.item(0).Location,
                        'fuelType': results.rows.item(0).FuelType
                    });
                }
                else {
                    console.log('*** ForecastModel requestUsingForecastDatabaseManager results returned null');
                }

                callback();
            }

            ForecastDatabaseManager.getInstance().getForecastAlert(response);
        }

        function requestUsingFuelsiteServiceManager(callback) {
            //
        }

        /*
         * Constructor
        */
        function ForecastModel() {
            ForecastModel.__super__.constructor.apply(this, arguments);
        }
        ForecastModel.prototype.defaults = {
            'indicator': null,
            'location' : null,
            'fuelType' : null
        };

        /*
         * Public Methods
        */
        ForecastModel.prototype.requestForecast = function(id, callback) {
            this.set(this.defaults, {silent:true});

            // request data with the FuelsiteServiceManager
            if (id === 'fuelsites') {
                requestUsingFuelsiteServiceManager(callback);
            }
            // request data with the ForecastDatabaseManager
            else if (id === 'database') {
                requestUsingForecastDatabaseManager.call(this, callback);
            }
        }

        ForecastModel.prototype.updateAttribute = function(key, val) {
            switch(key) {
                case 'forecastLocation': key = 'location'; break;
                case 'forecastFuelType': key = 'fuelType'; break;
            }

            this.set(key, val);
            this.set('indicator', '');
        };

        ForecastModel.prototype.acceptableFuelGrade = function() {
            console.log('AlertModel acceptableFuelGrade', this.get('fuelType'));
            return true;
        };

        return ForecastModel;

    })(Backbone.Model);


    return ForecastModel;
});