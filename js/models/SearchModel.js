define([ 'globals', 'utils', 'backbone' ],
function(globals, utils, Backbone) {

    'use strict';


    var SearchModel;
    SearchModel = (function(_super) {

        var LocationHelper;

        /*
         * Helper Methods
        */
        function getCurrentLocation() {
            var deferred = $.Deferred();

            new LocationHelper()
                .locateFromCurrentLocation()               // fetch location
                .once('change', function() {
                    console.log('change', arguments);
                    deferred.resolveWith(this, arguments); // resolve with data
                }, this);

            return deferred.promise();                     // return promisary-object
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
                    this.respondToSearchByLocation();
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
        };

        SearchModel.prototype.respondToSearchByAddress = function() {
            this.set({
                'location' : '',
                'latitude' : null,
                'longitude': null
            });
        };

        SearchModel.prototype.respondToSearchByLocation = function() {
            this.trigger('loadingbegin');             // start loading indicator

            utils.when(getCurrentLocation.call(this)) // deferred for current location with context
                .then(function(model) {
                    this.set(model.toJSON());         // update searchViewModel attributes
                })
                .done(function() {
                    this.trigger('loadingend');       // stop loading indicator
                });
        };

        return SearchModel;
    })(Backbone.Model);


    return SearchModel;
});