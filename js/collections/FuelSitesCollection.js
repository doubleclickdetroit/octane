define([ 'utils', 'globals', 'backbone', 'models/FuelSiteModel' ],
function(utils, globals, Backbone, FuelSiteModel) {

    'use strict';


    var FuelSitesCollection;
    FuelSitesCollection = (function(_super) {

        /*
         * Private Methods
        */
        function makeURL(params) {
            var constants    = globals.fuelsites.constants,
                key          = constants.WEBSERVICE,
                defaultBrand = params.brand === constants.DEFAULT_BRAND;

            return key.URL
                 + key.LONGITUDE    + params.longitude
                 + key.LATITUDE     + params.latitude
                 + key.RADIUS       + params.radius
                 + key.FUEL_TYPE    + params.fuelType
                 + key.SORT_BY      + params.sortBy
                 + key.FILTER_TODAY + params.filterToday
                 + key.PAGE_NUMBER  + params.pageNumber
                 + key.PAGE_SIZE    + (params.pageSize + constants.PAGE_SIZE_INCREMENT)
                 + (defaultBrand ? '' : key.BRAND + params.brand);
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

        FuelSitesCollection.prototype.isAllFuelSites = false;

        FuelSitesCollection.prototype.parse = function(response) {
            var fuelsitesCount  = this.length + globals.fuelsites.constants.PAGE_SIZE_INCREMENT;
            this.isAllFuelSites = fuelsitesCount >= response.totalResults;

            return response.searchResults;
        };

        FuelSitesCollection.prototype.sync = function(method, model, options) {
            // handle the read method & construct url
            if (method === 'read') {
                this.isAllFuelSites = false;
                this.url = makeURL(options);
            }

            Backbone.sync.apply(this, arguments);
        };

        return FuelSitesCollection;

    })(Backbone.Collection);


    return FuelSitesCollection;
});