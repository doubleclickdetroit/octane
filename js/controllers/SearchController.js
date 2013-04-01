define([ 'globals', 'utils', 'models/LocationModel', 'models/BackboneModel', 'models/SearchModel', 'collections/SearchCollection', 'views/SearchView' ],
function(globals, utils, LocationModel, BackboneModel, SearchModel, SearchCollection, SearchView) {

    'use strict';


    var SearchController;
    SearchController = (function() {

        var searchCriteriaModel, searchViewModel, searchCollection, searchView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchController() {
            searchCriteriaModel = new BackboneModel();
        }
        SearchController.prototype.init = function() {
            // create model, collection & view instances
            searchViewModel = new SearchModel({
                locationHelper: LocationModel
            });

            searchCollection = new SearchCollection();

            searchView = new SearchView({
                model     : searchViewModel,
                collection: searchCollection
            });
        };

        /*
         * Public Methods
        */
        SearchController.prototype.beforeNavigateCondition = function() {
            if (searchCollection.length === 0) {                           // collection is empty
                searchCollection
                    .once('loadingbegin', searchView.showLoadingIndicator) // show loading indicator
                    .once('loadingend', searchView.hideLoadingIndicator)   // show loading indicator
                    .once('reset', this.navigate)                          // finally allow navigate
                    .fetch();                                              // fetch collection data
            }

            // return condition allow navigate?
            return !!searchCollection.length;
        };

        SearchController.prototype.navigate = function() {
            utils.changePage(searchView.$el);
        };

        SearchController.prototype.updateSearchCriteriaModel = function(criteria) {
            // update searchCriteriaModel for the view to consume
            // but silently so the view can decide when to use the data
            searchCriteriaModel.set(criteria, {'silent':true});
        };

        SearchController.prototype.resetSearchViewModel = function(attributes) {
            // view render should always default to latest searchCriteriaModel data
            attributes = utils._.extend(searchCriteriaModel.toJSON(), attributes);
            searchViewModel.set(attributes);
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