define([ 'utils', 'backbone', 'globals' ],
function(utils, Backbone, globals) {

    'use strict';


    var ForecastModel;
    ForecastModel = (function(_super) {

        /*
         * Private Methods
        */
        function requestUsingDefaultCriteria(deferred) {
            // resolve with context and args
            deferred.resolveWith(this, [{
                'location': globals.forecast.constants.LOCATION,
                'fuelType': globals.forecast.constants.FUEL_TYPE
            }]);
        }

        function requestUsingFuelSiteSearchCriteria(deferred) {
            // resolve with context and args
            deferred.resolveWith(this, [{
                'location': getZipCode(this.criteriaModel.get('location')), // only the zipcode is used from the address of the location
                'fuelType': this.criteriaModel.get('fuelType')
            }]);
        }

        function sanitizeAttributes(attrs) {
            var GRADES   = globals.forecast.configuration.fuelType,
                fuelType = false;

            // sanitize fuelType
            utils._.each(GRADES, function(item) {
                if (utils._.contains(item.grades, attrs.fuelType)) {
                    fuelType = item.label;
                }
            });

            // assign values
            attrs.fuelType = fuelType;

            return attrs;
        }
                     
        function getZipCode(location) {

             var zipcode, regexp;
                     
             // regex statement
             regexp  = new RegExp(globals.APP.ZIP_CODE_PATTERN);
             
             // get the zipcode from the full address location
             zipcode = regexp.exec(location) || "";
             if (zipcode) {
                 zipcode = zipcode[0];
             }

             return zipcode;

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
                default     : value = "Neutral";
            }

            // simulate server response
            setTimeout(function() {
                deferred.resolveWith(self, [{'indicator': value}]);
            }, 2000);
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(ForecastModel, _super);

        function ForecastModel() {
            ForecastModel.__super__.constructor.apply(this, arguments);
        }

        ForecastModel.prototype.defaults = {
            'indicator': null,
            'location' : globals.forecast.constants.LOCATION,
            'fuelType' : globals.forecast.constants.FUEL_TYPE
        };

        ForecastModel.prototype.initialize = function(options) {
            this.criteriaModel = options.criteriaModel;
        };

        /*
         * Public Methods
        */
        ForecastModel.prototype.loadAttributes = function(id, callback) {

            var deferred = utils.$.Deferred();

            // respond to promisary-object
            utils.when(deferred.promise())
             .then(this.saveAttributes)
             .done(callback);

            // request data using the Criteria for Searching for the Fuel Sites
            if (id === 'fuelsites') {
                requestUsingFuelSiteSearchCriteria.call(this, deferred);
            }
            // request data with the defaults
            else if (id === 'menu') {
                requestUsingDefaultCriteria.call(this, deferred);
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
            return this.get('fuelType') !== false;
        };

        ForecastModel.prototype.saveAttributes = function(attrs) {
            var deferred = utils.$.Deferred();

            // reset the values so new (or same) values trigger "change" event
            this.set(this.defaults, {silent:true});

            // ensure values are acceptable
            this.set(sanitizeAttributes(attrs));

            // respond to promisary-object
            utils.when(deferred.promise())
             .progress(this.set)
             .done(this.set);

             // make request to update the indicator
             updateForecastIndicator.call(this, deferred, attrs);
        };

        return ForecastModel;

    })(Backbone.Model);


    return ForecastModel;
});
