define([ 'globals', 'utils', 'collections/FavoritesCollection', 'views/FavoritesView' ],
function(globals, utils, FavoritesCollection, FavoritesView) {

    'use strict';


    var FavoritesController;
    FavoritesController = (function() {

        var favoritesCollection, favoritesView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FavoritesController() {}
        FavoritesController.prototype.init = function() {
            // cache collection & view
            favoritesCollection = new FavoritesCollection();

            favoritesView = new FavoritesView({
                collection: favoritesCollection
            });
        };

        FavoritesController.prototype.navigate = function() {
            // utils.changePage(favoritesView.$el);
        };

        return FavoritesController;
    })();


    return new FavoritesController();
})