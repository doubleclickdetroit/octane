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
            var deferred = utils.Deferred();

            // type of location request
            type = type === 'address' ? 'Address' : 'CurrentLocation';

            // request location & resolve with data
            new LocationHelper()['locateFrom'+type](data)
                .once('fail', function() {
                    deferred.rejectWith(this, arguments);
                }, this)
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
                'latitude' : null,
                'longitude': null
            });

            // clear value if previously set by "enterLocation"
            if (this.previous('location')) {
                this.set('location', '');
            }
        };

        SearchModel.prototype.respondToSearchByPosition = function() {
            this.requestHelperForLocation('position', null, function(location) {
                this.set(location.toJSON()); // update attributes with location
            }, function() {                  // error handler, revert values
                this.set('searchBy', this.previous('searchBy')); // revert searchBy which view will invoke respondtoSearchByAddress
                this.set('location', this.previous('location')); // which will clear the location value, circumvent by setting separately
                this.trigger('change:location');                 // force change event for view to re-render
            });
        };

        SearchModel.prototype.requestHelperForLocation = function(type, data, success, failure) {
            this.trigger('loadingbegin');                            // start loading indicator
            utils.when(getLocationFromType.call(this, type, data))   // deferred for current location with context
                .then(success)                                       // send data to success callback
                .fail(failure || null)                               // send data to failure callback
                .always(function() { this.trigger('loadingend'); }); // stop loading indicator
        };

        return SearchModel;
    })(Backbone.Model);


    return SearchModel;
});