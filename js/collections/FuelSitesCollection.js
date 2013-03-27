define([ 'utils', 'globals', 'backbone', 'models/FuelSiteModel' ],
function(utils, globals, Backbone, FuelSiteModel) {

    'use strict';


    var FuelSitesCollection;
    FuelSitesCollection = (function(_super) {

        /*
         * Private Methods
        */
        function makeURL(params) {
            var key = globals.fuelsites.constants.WEBSERVICE;

            return key.URL
                 + key.LONGITUDE    + params.longitude
                 + key.LATITUDE     + params.latitude
                 + key.RADIUS       + params.radius
                 + key.FUEL_TYPE    + params.fuelType
                 + key.SORT_BY      + params.sortBy
                 + key.FILTER_TODAY + params.filterToday
                 + key.PAGE_NUMBER  + params.pageNumber
                 + key.PAGE_SIZE    + params.pageSize
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FuelSitesCollection, _super);

        function FuelSitesCollection() {
            FuelSitesCollection.__super__.constructor.apply(this, arguments);
        }

        // Define Model to use
        FuelSitesCollection.prototype.model = FuelSiteModel;

        FuelSitesCollection.prototype.parse = function(results) {
            return results.searchResults;
        };

        FuelSitesCollection.prototype.sync = function(method, model, options) {
            // handle the read method & construct url
            if (method === 'read') this.url = makeURL(options);
            Backbone.sync.apply(this, arguments);
        };

        return FuelSitesCollection;

    })(Backbone.Collection);


    return FuelSitesCollection;
});