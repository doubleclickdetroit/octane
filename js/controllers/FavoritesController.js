define([ 'globals', 'utils', 'models/BackboneModel', 'collections/FavoritesCollection', 'views/FavoritesView', 'views/FavoritesDialogView' ],
function(globals, utils, BackboneModel, FavoritesCollection, FavoritesView, FavoritesDialogView) {

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
            searchCriteriaModel = new BackboneModel();

            favoritesCollection = new FavoritesCollection();

            favoritesView = new FavoritesView({
                collection: favoritesCollection,
            });

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

        FavoritesController.prototype.updateSearchCriteriaModel = function(attributes) {
            searchCriteriaModel.set(attributes);
        };

        return FavoritesController;
    })();


    return new FavoritesController();
})