define([ 'utils', 'globals', 'backbone' ],
function(utils, globals, Backbone) {

    'use strict';


    var FuelSitesModel;
    FuelSitesModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FuelSitesModel, _super);

        function FuelSitesModel() {
            FuelSitesModel.__super__.constructor.apply(this, arguments);
        }

        FuelSitesModel.prototype.defaults = {
            'id'         : 1, // id must be assigned for sync delete
            'searchBy'   : globals.FUELSITES.START_LOCATION,
            'location'   : null, // need to look when/where/how this is defined
            'latitude'   : null, // need to look when/where/how this is defined
            'longitude'  : null, // need to look when/where/how this is defined
            'radius'     : globals.FUELSITES.RADIUS,
            'fuelType'   : globals.FUELSITES.FUEL_TYPE,
            'sortBy'     : globals.FUELSITES.SORT_BY,
            'filterToday': globals.FUELSITES.FILTER_TODAY,
            'pageNumber' : globals.FUELSITES.PAGE_NUMBER,
            'pageSize'   : globals.FUELSITES.PAGE_SIZE,
            'brand'      : globals.FUELSITES.BRAND
        };

        FuelSitesModel.prototype.url = function() {
            var key   = globals.WEBSERVICE.FUEL_SITE,
                value = this.toJSON();

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

        FuelSitesModel.prototype.initialize = function(options) {
            // cache location & database
            this.location = options.location;
            this.database = options.database;

            // update attributes on location change
            this.location.on('change', function(data) {
                this.set(data.toJSON());
            }, this);

            // on the initial location update
            this.location.once('change', function() {

                // set attributes to default search values
                this.database.getDefaultSearchValue(function(data) {
                    // console.log('database.getDefaultSearchValue', data.length);
                }, this);

            }, this);

        };

        FuelSitesModel.prototype.sync = function(method, model, options) {
            switch(method) {
                case "create":
                case "update":
                    this.database.insertSearchDetails(this.toJSON());
                    break;

                case "read":
                    utils.$.getJSON(this.url(), function(data) {
                        console.log(data);
                    });
                    break;

                case "delete":
                    this.database.deleteDefaultSearchData();
                    break;
            }
        };

        return FuelSitesModel;

    })(Backbone.Model);


    return FuelSitesModel;
});