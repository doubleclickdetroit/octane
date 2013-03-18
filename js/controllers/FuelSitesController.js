define([ 'globals', 'utils', 'views/FuelSitesView', 'collections/FuelSitesCollection' ],
function(globals, utils, FuelSitesView, FuelSitesCollection) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var fuelSitesCollection, fuelSitesView;

        function FuelSitesController() {}

        FuelSitesController.prototype.init = function() {
            // cache & instantiate View and Collection
            fuelSitesView       = new FuelSitesView();
            fuelSitesCollection = new FuelSitesCollection();
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites', null, true);
        };

        FuelSitesController.prototype.getFuelSites = function(criteria) {
            if (criteria.viewMode === globals.fuelsites.constants.VIEW_MODE) {

                // listen for when collection receives the fuelsites
                fuelSitesCollection.once('reset', function(collection) {
                    // render search criteria & fuelsites
                    fuelSitesView.render(criteria, collection.toJSON());

                    // hide the loading indicator
                    this.loadingEnd(false);
                }, this);

                // display loading indicator
                this.loadingBegin(true);

                // based on criteria, fetch new fuelsites
                fuelSitesCollection.fetch(criteria);
            }
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