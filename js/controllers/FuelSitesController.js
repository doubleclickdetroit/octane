define([ 'globals', 'utils', 'backbone', 'views/FuelSitesMapView', 'views/DirectionsView', 'views/FuelSitesView', 'collections/FuelSitesCollection', 'models/SearchDetailsModel' ],
function(globals, utils, Backbone, FuelSitesMapView, DirectionsView, FuelSitesView, FuelSitesCollection, SearchDetailsModel) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var searchCriteriaModel, fuelSitesCollection, fuelSitesView, fuelSitesMapView, directionsView;


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FuelSitesController() {
            // cache searchDetailsModel
            searchCriteriaModel = SearchDetailsModel.getInstance();

            // listen for events
            searchCriteriaModel.on('change',       this.indexFuelSites, this);
            searchCriteriaModel.on('loadingbegin', this.loadingBegin, this);
            searchCriteriaModel.on('loadingend',   this.loadingEnd, this);
        }

        FuelSitesController.prototype.init = function() {
            // cache & instantiate View, Model and Collection
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
        FuelSitesController.prototype.navigate = function(viewId) {
            if (viewId === 'map') this.showMap();
            else                  utils.changePage(fuelSitesView.$el, null, null, true); // update hash
        };

        FuelSitesController.prototype.indexFuelSites = function() {
            var criteria = searchCriteriaModel.toJSON();
            if (criteria.latitude === null && criteria.longitude === null) return;

            this.loadingBegin();                      // show inidicator before request
            fuelSitesCollection
                .once('reset', this.loadingEnd, this) // hide indicator at end of request
                .fetch(criteria);                     // fetch new fuelsites with criteria
        };

        FuelSitesController.prototype.showFuelSite = function(fuelsiteId) {
            var fuelSiteModel = fuelSitesCollection.get(fuelsiteId);
            utils.changePage(directionsView.$el, null, null, true); // update hash

            this.loadingBegin(); // show indicator before requeset

            // request directions
            utils.when(directionsView.requestDirections(fuelSiteModel.toJSON()))
                .always(this.loadingEnd)          // hide indicator at end of request
                .done(directionsView.render)      // render directions
                .fail(directionsView.handleError) // handle failure
                .fail(this.navigate);             // redirect to fuelsites
        };

        FuelSitesController.prototype.showMap = function() {
            utils.changePage(fuelSitesMapView.$el);
            fuelSitesMapView.render(fuelSitesCollection);
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