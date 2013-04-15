define([ 'globals', 'utils', 'backbone', 'views/FuelSitesMapView', 'views/DirectionsView', 'views/FuelSitesView', 'collections/FuelSitesCollection' ],
function(globals, utils, Backbone, FuelSitesMapView, DirectionsView, FuelSitesView, FuelSitesCollection) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var searchCriteriaModel, fuelSitesCollection, fuelSitesView, fuelSitesMapView, directionsView;


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FuelSitesController() {}
        FuelSitesController.prototype.init = function() {
            // cache & instantiate View, Model and Collection
            searchCriteriaModel = new Backbone.Model();

            fuelSitesCollection = new FuelSitesCollection();

            fuelSitesMapView = new FuelSitesMapView({
                model: searchCriteriaModel
            });

            directionsView = new DirectionsView({
                model: searchCriteriaModel
            });

            fuelSitesView = new FuelSitesView({
                collection   : fuelSitesCollection,
                criteriaModel: searchCriteriaModel
            });
        };

        /*
         * Public Methods
        */
        FuelSitesController.prototype.navigate = function(viewId, siteId) {
            switch(viewId) {
                case 'map':      this.showMap(siteId);      break;
                case 'fuelsite': this.showFuelSite(siteId); break;
                default:         utils.changePage(fuelSitesView.$el, null, null, true); // update hash
            }
        };

        FuelSitesController.prototype.updateCriteria = function(criteria) {
            searchCriteriaModel.set(criteria);
            this.indexFuelSites();
        };

        FuelSitesController.prototype.indexFuelSites = function() {
            var criteria = searchCriteriaModel.toJSON();
            this.loadingBegin();                      // show inidicator before request
            fuelSitesCollection
                .once('reset', this.loadingEnd, this) // hide indicator at end of request
                .fetch(criteria);                     // fetch new fuelsites with criteria
        };

        FuelSitesController.prototype.showFuelSite = function(siteId) {
            var fuelSiteModel = fuelSitesCollection.get(siteId);
            utils.changePage(directionsView.$el, null, null, true); // update hash

            this.loadingBegin(); // show indicator before requeset

            // set directionsView fuelSiteModel
            directionsView.fuelSiteModel = fuelSiteModel;

            // request directions
            utils.when(directionsView.requestDirections())
                .always(this.loadingEnd)          // hide indicator at end of request
                .done(directionsView.render)      // render directions
                .fail(directionsView.handleError) // handle failure
                .fail(this.navigate);             // redirect to fuelsites
        };

        FuelSitesController.prototype.showMap = function(siteId) {
            var fuelsite  = siteId ? fuelSitesCollection.get(siteId).toJSON() : null,
                fuelsites = fuelsite ? fuelSitesCollection.clone().reset(fuelsite) : fuelSitesCollection;

            utils.changePage(fuelSitesMapView.$el);
            fuelSitesMapView.render(fuelsites);
        };

        FuelSitesController.prototype.loadingBegin = function(checkView) {
            // show loader if active view is fuelSitesView
            checkView = checkView === undefined ? true : checkView;

            fuelSitesView.showLoadingIndicator(checkView);
            directionsView.showLoadingIndicator(checkView);
            fuelSitesMapView.showLoadingIndicator(checkView);
        };

        FuelSitesController.prototype.loadingEnd = function(checkView) {
            // hide loader if active view is fuelSitesView
            checkView = checkView === undefined ? false : checkView;

            fuelSitesView.hideLoadingIndicator(checkView);
            directionsView.hideLoadingIndicator(checkView);
            fuelSitesMapView.hideLoadingIndicator(checkView);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});