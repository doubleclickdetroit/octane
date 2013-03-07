define([ 'utils', 'globals', 'backbone' ],
function(utils, globals, Backbone) {

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
            this.database = options.database;
        };

        SearchDetailsModel.prototype.updateAttributes = function(data) {
            if (data.length) {
                this.set({
                    'searchBy'     : data.item(0).SearchBy,
                    'radius'       : data.item(0).Radius,
                    'fuelType'     : data.item(0).FuelType,
                    'sortBy'       : data.item(0).SortBy,
                    'filterToday'  : data.item(0).LimitResult.toLowerCase(),
                    'brand'        : data.item(0).Brand,
                    'limitResult'  : data.item(0).LimitResult,
                    'favoritesName': data.item(0).FavoritesName
                });
            }
        };

        SearchDetailsModel.prototype.sync = function(method, model, options) {
            switch(method) {
                case "create":
                case "update":
                    this.database.insertSearchDetails(this.toJSON());
                    break;

                case "read":
                    this.database.getDefaultSearchValue(this.updateAttributes, this);
                    break;

                case "delete":
                    this.database.deleteDefaultSearchData();
                    break;
            }
        };

        return SearchDetailsModel;

    })(Backbone.Model);


    return SearchDetailsModel;
});