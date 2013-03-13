define([ 'utils', 'globals', 'backbone', 'managers/SearchDetailsDatabaseManager' ],
function(utils, globals, Backbone, SearchDetailsDatabaseManager) {

    'use strict';


    var SearchDetailsModel;
    SearchDetailsModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(SearchDetailsModel, _super);

        function SearchDetailsModel() {
            SearchDetailsModel.__super__.constructor.apply(this, arguments);
        }

        SearchDetailsModel.prototype.defaults = {
            // Allow the UD in CRUD
            'id': 1,

            // Defaults
            'searchBy'   : globals.SEARCH_DETAILS.START_LOCATION,
            'radius'     : globals.SEARCH_DETAILS.RADIUS,
            'fuelType'   : globals.SEARCH_DETAILS.FUEL_TYPE,
            'sortBy'     : globals.SEARCH_DETAILS.SORT_BY,
            'filterToday': globals.SEARCH_DETAILS.FILTER_TODAY,
            'pageNumber' : globals.SEARCH_DETAILS.PAGE_NUMBER,
            'pageSize'   : globals.SEARCH_DETAILS.PAGE_SIZE,
            'brand'      : globals.SEARCH_DETAILS.BRAND,

            // Geolocation data
            'location' : null, // need to look when/where/how this is defined
            'latitude' : null, // need to look when/where/how this is defined
            'longitude': null, // need to look when/where/how this is defined

            // Search related data
            'updatedResult': globals.SEARCH_DETAILS.UPDATED_RESULT,
            'limitResult'  : globals.SEARCH_DETAILS.LIMIT_RESULT,
            'favoritesName': globals.SEARCH_DETAILS.FAVORITES_NAME,
            'viewMode'     : globals.SEARCH_DETAILS.VIEW_MODE
        };

        SearchDetailsModel.prototype.initialize = function(options) {
            this.location = options.location;

            this.location

                // initially fetch saved data
                .once('change', this.fetch(), this)

                // update location attributes
                .on('change', function(model) {
                    console.log('SearchDetailsModel received new locationModel data!');
                    this.set(this.defaults, {silent:true});
                    this.set(model.toJSON());
                }, this)

                // propegate loading event
                .on('loadingstart', function() {
                    this.trigger('loadingstart');
                }, this)

                // propegate loading event
                .on('loadingend', function() {
                    this.trigger('loadingend');
                }, this);
        };

        SearchDetailsModel.prototype.updateAttributes = function(data) {
            if (data.length) {
                this.set({
                    'searchBy'     : data.item(0).SearchBy,
                    'radius'       : data.item(0).Radius,
                    'fuelType'     : data.item(0).FuelType,
                    'sortBy'       : data.item(0).SortBy,
                    'filterToday'  : data.item(0).LimitResult.toLowerCase() || globals.SEARCH_DETAILS.FILTER_TODAY,
                    'brand'        : data.item(0).Brand,
                    'limitResult'  : data.item(0).LimitResult,
                    'favoritesName': data.item(0).FavoritesName
                });
            }
        };

        SearchDetailsModel.prototype.sync = function(method, model, options) {
            var database = SearchDetailsDatabaseManager.getInstance();

            switch(method) {
                case "create":
                case "update":
                    database.insertSearchDetails(this.toJSON());
                    break;

                case "read":
                    database.getDefaultSearchValue(this.updateAttributes, this);
                    break;

                case "delete":
                    database.deleteDefaultSearchData();
                    break;
            }
        };

        return SearchDetailsModel;

    })(Backbone.Model);


    return SearchDetailsModel;
});