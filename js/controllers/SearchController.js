define([ 'utils', 'models/_EmptyModel', 'views/SearchView' ],
function(utils, EmptyModel, SearchView) {

    'use strict';


    var SearchController;
    SearchController = (function() {

        var searchCriteriaModel, searchView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchController() {}
        SearchController.prototype.init = function() {
            // create model & view instances
            searchCriteriaModel = new EmptyModel();

            searchView = new SearchView({
                model: new EmptyModel()
            });
        };

        /*
         * Public Methods
        */
        SearchController.prototype.navigate = function() {
            utils.changePage(searchView.$el);
        };

        SearchController.prototype.resetSearchViewModel = function() {
            // render needs to display the latest searchCriteriaModel data
            searchView.model.set(searchCriteriaModel.toJSON());
        };

        SearchController.prototype.updateSearchByAttribute = function(value) {
            searchView.model.set('searchBy', value);
        };

        SearchController.prototype.updateCriteria = function(criteria) {
            searchCriteriaModel.set(criteria);
        };

        return SearchController;
    })();


    return new SearchController();
});