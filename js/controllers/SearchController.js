define([ 'globals', 'utils', 'models/LocationModel', 'models/BackboneModel', 'models/SearchModel', 'views/SearchView' ],
function(globals, utils, LocationModel, BackboneModel, SearchModel, SearchView) {

    'use strict';


    var SearchController;
    SearchController = (function() {

        var searchCriteriaModel, searchViewModel, searchView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchController() {
            searchCriteriaModel = new BackboneModel();
        }

        SearchController.prototype.init = function() {
            // create model & view instances
            searchViewModel = new SearchModel();
            searchView = new SearchView({
                model: searchViewModel
            });
        };

        /*
         * Helper Methods
        */
        function getCurrentLocation() {
            var deferred = $.Deferred();

            new LocationModel()
                .locateFromCurrentLocation()       // fetch location
                .once('change', deferred.resolve); // resolve with data

            return deferred.promise();             // return promisary-object
        }

        /*
         * Public Methods
        */
        SearchController.prototype.navigate = function() {
            utils.changePage(searchView.$el);
        };

        SearchController.prototype.updateSearchCriteriaModel = function(criteria) {
            // update searchCriteriaModel for the view to consume
            // but silently so the view can decide when to use the data
            searchCriteriaModel.set(criteria, {silent:true});
        };

        SearchController.prototype.resetSearchViewModel = function() {
            // view render should always default to latest searchCriteriaModel data
            searchViewModel.set(searchCriteriaModel.toJSON());
        };

        SearchController.prototype.updateAttribute = function(key, val) {
            // determine if attribute can immediately be updated
            // or warrants updating the location attribute as well
            if (key === globals.search.constants.NAME_SEARCH_BY) {
                this.updateLocationAndSearchByAttributes(val); // searchBy and location attributes
            }
            else {
                searchViewModel.set(key, val);                 // all other attributes
            }
        };

        SearchController.prototype.saveSearchCriteriaModel = function() {
            console.log('saveSearchCriteriaModel', searchViewModel.save());
        };

        /*
         * Private Methods
        */
        SearchController.prototype.updateLocationAndSearchByAttributes = function(searchByValue) {
            // update searchViewModel with searchBy & location attributes
            var attributes = {
                'searchBy': searchByValue
            };

            // if enterLocation then it should set searchBy
            if (searchByValue === globals.search.constants.SEARCH_BY_ENTER_LOCATION) {
                searchViewModel.set(attributes);
            }

            // if currentLocation then set searchBy and get the current location
            if (searchByValue === globals.search.constants.SEARCH_BY_CURRENT_LOCATION) {
                this.loadingBegin();                            // start loading indicator

                $.when(getCurrentLocation())                    // deferred for current location
                 .then(function(model) {
                    utils._.extend(attributes, model.toJSON()); // extend attributes with new data
                    searchViewModel.set(attributes);            // update searchViewModel attributes
                 })
                 .done(this.loadingEnd);                        // start loading indicator
            }
        };

        SearchController.prototype.loadingBegin = function(checkView) {
            searchView.showLoadingIndicator(true);
        };

        SearchController.prototype.loadingEnd = function() {
            searchView.hideLoadingIndicator(true);
        };

        return SearchController;
    })();


    return new SearchController();
});