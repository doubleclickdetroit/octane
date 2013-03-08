define([ 'utils', 'globals', 'backbone', 'models/FuelSiteModel' ],
function(utils, globals, Backbone, FuelSiteModel) {

    'use strict';


    var FuelSitesCollection;
    FuelSitesCollection = (function(_super) {

        var _constants = globals.fuelsites.constants;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FuelSitesCollection, _super);

        function FuelSitesCollection() {
            FuelSitesCollection.__super__.constructor.apply(this, arguments);
        }

        // Define Model to use
        FuelSitesCollection.prototype.model = FuelSiteModel;

        // Build URL
        FuelSitesCollection.prototype.url = function() {
            var key   = _constants.WEBSERVICE,
                value = this.searchDetails.toJSON();

            return key.URL
                 + key.LONGITUDE    + value.longitude
                 + key.LATITUDE     + value.latitude
                 + key.RADIUS       + value.radius
                 + key.FUEL_TYPE    + value.fuelType
                 + key.SORT_BY      + value.sortBy
                 + key.FILTER_TODAY + value.filterToday
                 + key.PAGE_NUMBER  + value.pageNumber
                 + key.PAGE_SIZE    + value.pageSize
        };

        FuelSitesCollection.prototype.initialize = function(options) {
            // cache searchDetails
            this.searchDetails = options.searchDetails;

            //
            this.searchDetails.on('change', function(criteria) {
                if (criteria.get('viewMode') === _constants.VIEW_MODE) {
                    this.fetch();
                }
            }, this);
        };

        FuelSitesCollection.prototype.parse = function(results) {
            return results.searchResults;
        };

        return FuelSitesCollection;

    })(Backbone.Collection);


    return FuelSitesCollection;
});