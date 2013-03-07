define([ 'utils', 'globals', 'backbone', 'models/FuelSiteModel' ],
function(utils, globals, Backbone, FuelSiteModel) {

    'use strict';


    var FuelSitesCollection;
    FuelSitesCollection = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FuelSitesCollection() {
            FuelSitesCollection.__super__.constructor.apply(this, arguments);
        }

        // Define Model to use
        FuelSitesCollection.prototype.model = FuelSiteModel;

        return FuelSitesCollection;

    })(Backbone.Collection);


    return FuelSitesCollection;
});