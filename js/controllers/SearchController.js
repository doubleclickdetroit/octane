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
            searchViewModel = new SearchModel({
                locationHelper: LocationModel
            });

            searchView = new SearchView({
                model: searchViewModel
            });
        };

        /*
         * Public Methods
        */
        SearchController.prototype.navigate = function() {
            utils.changePage(searchView.$el);
        };

        SearchController.prototype.updateSearchCriteriaModel = function(criteria) {
            // update searchCriteriaModel for the view to consume
            // but silently so the view can decide when to use the data
            searchCriteriaModel.set(criteria, {'silent':true});
        };

        SearchController.prototype.resetSearchViewModel = function() {
            // view render should always default to latest searchCriteriaModel data
            searchViewModel.set(searchCriteriaModel.toJSON());
        };

        SearchController.prototype.updateAttribute = function(key, val) {
            searchViewModel.set(key, val);
        };

        SearchController.prototype.saveSearchCriteriaModel = function(callback) {
            searchViewModel.save({}, {
                'callback': callback
            });
        };

        return SearchController;
    })();


    return new SearchController();
});