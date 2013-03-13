define([ 'globals', 'utils', 'views/FuelSitesView', 'collections/FuelSitesCollection' ],
function(globals, utils, FuelSitesView, FuelSitesCollection) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var _constants, locationModel, searchDetailsModel, fuelSitesCollection, fuelSitesView;

        function FuelSitesController() {}

        FuelSitesController.prototype.init = function() {
            fuelSitesCollection = new FuelSitesCollection();
            fuelSitesView = new FuelSitesView({
                collection: fuelSitesCollection
            });
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites', null, true);
        };

        FuelSitesController.prototype.getFuelSites = function(criteria) {
            if (criteria.viewMode === globals.fuelsites.constants.VIEW_MODE) {
                fuelSitesCollection.fetch(criteria);
            }
        };

        FuelSitesController.prototype.loadingStart = function() {
            fuelSitesView.showLoadingIndicator(true);
        };

        FuelSitesController.prototype.loadingEnd = function() {
            fuelSitesView.hideLoadingIndicator(true);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});