define([ 'utils', 'views/SearchView' ],
function(utils, SearchView) {

    'use strict';


    var SearchController;
    SearchController = (function() {

        var searchView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchController() {}
        SearchController.prototype.init = function() {
            searchView = new SearchView();
        };

        /*
         * Public Methods
        */
        SearchController.prototype.navigate = function() {
            utils.changePage(searchView.$el);
        };

        return SearchController;
    })();


    return new SearchController();
});