define([ 'globals', 'utils', 'backbone' ],
function(globals, utils, Backbone) {

    'use strict';


    var SearchModel;
    SearchModel = (function(_super) {

        var LocationHelper;

        /*
         * Helper Methods
        */
        function getLocationFromType(type, data) {
            var deferred = $.Deferred();

            // type of location request
            type = type === 'address' ? 'Address' : 'CurrentLocation';

            // request location & resolve with data
            new LocationHelper()['locateFrom'+type](data)
                .once('change', function() {
                    deferred.resolveWith(this, arguments);
                }, this);

            // return promisary-object
            return deferred.promise();
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(SearchModel, _super);

        function SearchModel() {
            SearchModel.__super__.constructor.apply(this, arguments);
        }

        SearchModel.prototype.initialize = function(options) {
            LocationHelper = options.locationHelper;

            // attribute change dispatcher
            this.on('change:searchBy', function(model, searchBy) {
                if (searchBy === globals.search.constants.SEARCH_BY_ADDRESS) {
                    this.respondToSearchByAddress();
                }
                if (searchBy === globals.search.constants.SEARCH_BY_CURRENT_LOCATION) {
                    this.respondToSearchByPosition();
                }
            }, this);
        };

        SearchModel.prototype.validate = function() {
            if (this.get('location') === '') {
                return globals.search.constants.INVALID_LOCATION_MESSAGE
            }
        };

        SearchModel.prototype.sync = function(method, model, options) {
            // override to prevent from trying to UPDATE server
            if (method === 'update') {
                if (model.get('searchBy') === globals.search.constants.SEARCH_BY_ADDRESS) {
                    var address = this.get('location');
                    this.requestHelperForLocation('address', address, function(location) {
                        model.set(location.toJSON());     // update attributes with location
                        options.callback(model.toJSON()); // invoke callback with model
                    });
                }
                else {
                    options.callback(model.toJSON());     // invoke callback with model
                }
            }
        };

        SearchModel.prototype.respondToSearchByAddress = function() {
            this.set({
                'location' : '',
                'latitude' : null,
                'longitude': null
            });
        };

        SearchModel.prototype.respondToSearchByPosition = function() {
            this.requestHelperForLocation('position', null, function(location) {
                this.set(location.toJSON()); // update attributes with location
            });
        };

        SearchModel.prototype.requestHelperForLocation = function(type, data, callback) {
            this.trigger('loadingbegin');                          // start loading indicator
            utils.when(getLocationFromType.call(this, type, data)) // deferred for current location with context
                .then(callback)                                    // send data to callback
                .done(function() { this.trigger('loadingend'); }); // stop loading indicator
        };

        return SearchModel;
    })(Backbone.Model);


    return SearchModel;
});