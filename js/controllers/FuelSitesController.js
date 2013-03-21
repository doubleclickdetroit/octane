define([ 'globals', 'utils', 'backbone', 'views/DirectionsView', 'views/FuelSitesView', 'collections/FuelSitesCollection' ],
function(globals, utils, Backbone, DirectionsView, FuelSitesView, FuelSitesCollection) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var searchCriteriaModel, fuelSitesCollection, fuelSitesView, directionsView;


        function FuelSitesController() {}
        FuelSitesController.prototype.init = function() {
            // cache & instantiate View and Collection
            searchCriteriaModel = new Backbone.Model();

            fuelSitesCollection = new FuelSitesCollection();

            directionsView = new DirectionsView({
                model: searchCriteriaModel
            });

            fuelSitesView = new FuelSitesView({
                collection: fuelSitesCollection
            });
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites');
        };

        FuelSitesController.prototype.updateCriteria = function(criteria) {
            searchCriteriaModel.set(criteria);
            this.indexFuelSites();
        };

        FuelSitesController.prototype.indexFuelSites = function() {
            var criteria = searchCriteriaModel.toJSON();
            if (criteria.viewMode === globals.fuelsites.constants.VIEW_MODE) {
                this.loadingBegin();                      // show inidicator before request
                fuelSitesCollection
                    .once('reset', this.loadingEnd, this) // hide indicator at end of request
                    .fetch(criteria);                     // fetch new fuelsites with criteria
            }
        };

        FuelSitesController.prototype.showFuelSite = function(fuelsiteId) {
            var fuelSiteModel = fuelSitesCollection.get(fuelsiteId);
            utils.changePage('#directions', null, null, true); // update hash

            this.loadingBegin(); // show indicator before requeset

            // request directions
            utils.when(directionsView.requestDirections(fuelSiteModel.toJSON()))
                .always(this.loadingEnd)          // hide indicator at end of request
                .done(directionsView.render)      // render directions
                .fail(directionsView.handleError) // handle failure
                .fail(this.navigate)              // redirect to fuelsites
        };

        FuelSitesController.prototype.loadingBegin = function(checkView) {
            // show loader if active view is fuelSitesView
            checkView = checkView === undefined ? true : checkView;

            fuelSitesView.showLoadingIndicator(checkView);
            directionsView.showLoadingIndicator(checkView);
        };

        FuelSitesController.prototype.loadingEnd = function(checkView) {
            // hide loader if active view is fuelSitesView
            checkView = checkView === undefined ? false : checkView;

            fuelSitesView.hideLoadingIndicator(checkView);
            directionsView.hideLoadingIndicator(checkView);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});