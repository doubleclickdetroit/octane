define([ 'globals', 'utils', 'views/DirectionsView', 'views/FuelSitesView', 'collections/FuelSitesCollection' ],
function(globals, utils, DirectionsView, FuelSitesView, FuelSitesCollection) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var fuelSitesCollection, fuelSitesView, directionsView;


        function FuelSitesController() {}
        FuelSitesController.prototype.init = function() {
            // cache & instantiate View and Collection
            fuelSitesCollection = new FuelSitesCollection();

            directionsView = new DirectionsView();

            fuelSitesView = new FuelSitesView({
                collection: fuelSitesCollection
            });
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites');
        };

        FuelSitesController.prototype.getFuelSites = function(criteria) {
            if (criteria.viewMode === globals.fuelsites.constants.VIEW_MODE) {
                // display loading indicator
                this.loadingBegin(true);

                fuelSitesCollection
                    // hide the loading indicator
                    .once('reset', function() { this.loadingEnd(false) }, this)
                    // fetch new fuelsites with criteria
                    .fetch(criteria);
            }
        };

        FuelSitesController.prototype.showFuelSite = function(fuelsiteId) {
            var fuelSiteModel = fuelSitesCollection.get(fuelsiteId);
            utils.changePage('#directions', null, null, true); // update hash
            directionsView.render(fuelSiteModel);
        };

        FuelSitesController.prototype.loadingBegin = function(checkView) {
            // show loader if active view is fuelSitesView
            checkView = checkView === undefined ? true : checkView;
            fuelSitesView.showLoadingIndicator(checkView);
        };

        FuelSitesController.prototype.loadingEnd = function(checkView) {
            // hide loader if active view is fuelSitesView
            checkView = checkView === undefined ? true : checkView;
            fuelSitesView.hideLoadingIndicator(checkView);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});