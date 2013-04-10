define([ 'globals', 'utils', 'models/SearchDetailsModel', 'collections/FavoritesCollection', 'views/FavoritesView', 'views/FavoritesDialogView' ],
function(globals, utils, SearchDetailsModel, FavoritesCollection, FavoritesView, FavoritesDialogView) {

    'use strict';


    var FavoritesController;
    FavoritesController = (function() {

        var searchCriteriaModel, favoritesCollection, favoritesView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FavoritesController() {}
        FavoritesController.prototype.init = function() {
            // cache collection & view
            searchCriteriaModel = SearchDetailsModel.getInstance();

            favoritesCollection = new FavoritesCollection();

            favoritesView = new FavoritesView({
                collection: favoritesCollection,
            });

            // fetch favorites
            favoritesCollection.fetch();
        };

        FavoritesController.prototype.navigate = function() {
            utils.changePage(favoritesView.$el);
        };

        FavoritesController.prototype.promptFavorite = function() {
            new FavoritesDialogView().render();
        };

        FavoritesController.prototype.toggleEditFavorites = function(isEditable) {
            favoritesCollection.isEditable = isEditable;
        };

        FavoritesController.prototype.saveAttributes = function(attributes) {
            attributes = utils._.extend(searchCriteriaModel.toJSON(), attributes);
            favoritesCollection.create(attributes);
        };

        FavoritesController.prototype.removeAttributes = function(favoriteModel) {
            favoriteModel.destroy();
        };

        return FavoritesController;
    })();


    return new FavoritesController();
})