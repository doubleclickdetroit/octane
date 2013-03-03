define([ 'utils', 'backbone', 'globals', 'managers/ForecastDatabaseManager' ],
function(utils, Backbone, globals, ForecastDatabaseManager) {

    'use strict';


    var ForecastModel;
    ForecastModel = (function(_super) {

        utils.extend(ForecastModel, _super);

        /*
         * Private Methods
        */
        function requestUsingForecastDatabaseManager(deferred) {
            var self = this;

            function response(tx, results) {
                var args = [];

                if (results.rows.length > 0) {
                    args.push({
                        'location': results.rows.item(0).Location,
                        'fuelType': results.rows.item(0).FuelType
                    });
                }
                else {
                    args.push({
                        'location': globals.forecast.constants.LOCATION,
                        'fuelType': globals.forecast.constants.FUEL_TYPE
                    });
                }

                // resolve with context and args
                deferred.resolveWith(self, args);
            }

            // retrieve the data
            ForecastDatabaseManager.getInstance().getForecastAlert(response);
        }

        function requestUsingFuelsiteServiceManager(deferred) {
            //
        }

        function sanitizeAttributes(attrs) {
            switch(attrs.fuelType) {
                case undefined:
                case "Gasoline":
                case "Unleaded Regular":
                case "Unleaded Plus":
                case "Unleaded Premium":
                    attrs.fuelType = "Gasoline";
                    break;

                case "Diesel":
                case "Diesel Regular":
                case "Diesel Premium":
                    attrs.fuelType = "Diesel";
                    break;

                default:
                    attrs.fuelType = false;
            }

            return attrs;
        }

        function updateForecastIndicator(deferred, attrs) {
            var value, self = this;

            deferred.notifyWith(self, [{'indicator': 'loading'}]);

            switch(attrs.location) {
                case "04102": value = "Slightly Up";   break;
                case "04103": value = "Strongly Up";   break;
                case "04104": value = "Slightly Down"; break;
                case "04105": value = "Strongly Down"; break;
                case "04101":
                default:      value = "Neutral";
            }

            // simulate server response
            setTimeout(function() {
                deferred.resolveWith(self, [{
                    'indicator': value
                }]);
            }, 2000);
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
        ForecastModel.prototype.loadAttributes = function(id, callback) {
            var deferred = utils.$.Deferred();

            // respond to promisary-object
            utils.$.when(deferred.promise())
             .then(this.saveAttributes)
             .done(callback);

            // request data with the FuelsiteServiceManager
            if (id === 'fuelsites') {
                requestUsingFuelsiteServiceManager.call(this, deferred);
            }
            // request data with the ForecastDatabaseManager
            else if (id === 'database') {
                requestUsingForecastDatabaseManager.call(this, deferred);
            }
        };

        ForecastModel.prototype.updateAttribute = function(key, val) {
            switch(key) {
                case 'forecastLocation': key = 'location'; break;
                case 'forecastFuelType': key = 'fuelType'; break;
            }

            this.set(key, val);
            this.set('indicator', '');
        };

        ForecastModel.prototype.validateAttributes = function() {
            return true;
            // return this.get('fuelType') === globals.forecast.constants.DEFAULT_FUEL_TYPE;
        };

        ForecastModel.prototype.saveAttributes = function(attrs) {
            var deferred = utils.$.Deferred();

            // reset the values so new (or same) values trigger "change" event
            this.set(this.defaults, {silent:true});

            // ensure values are acceptable
            this.set(sanitizeAttributes(attrs));

            // respond to promisary-object
            utils.$.when(deferred.promise())
             .progress(this.set)
             .done(this.set);

             // make request to update the indicator
             updateForecastIndicator.call(this, deferred, attrs);
        };

        return ForecastModel;

    })(Backbone.Model);


    return ForecastModel;
});