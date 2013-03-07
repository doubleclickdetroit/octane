define([ 'utils', 'globals', 'backbone' ],
function(utils, globals, Backbone) {

    'use strict';


    var FuelSiteModel;
    FuelSiteModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FuelSiteModel() {
            FuelSiteModel.__super__.constructor.apply(this, arguments);
        }

        return FuelSiteModel;

    })(Backbone.Model);


    return FuelSiteModel;
});