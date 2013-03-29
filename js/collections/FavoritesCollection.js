define([ 'globals', 'utils', 'backbone', 'managers/FavoritesDatabaseManager', 'models/FavoriteModel' ],
function(globals, utils, Backbone, FavoritesDatabaseManager, FavoriteModel) {

    'use strict';


    var FavoritesCollection;
    FavoritesCollection = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FavoritesCollection, _super);

        function FavoritesCollection() {
            FavoritesCollection.__super__.constructor.apply(this, arguments);
        }

        // Define Model to use
        FavoritesCollection.prototype.model = FavoriteModel;

        // Sorting
        FavoritesCollection.prototype.comparator = function(favoriteModel) {
            // is model populated from localSQL or from collection.create()
            var attr = favoriteModel.has('FavoritesName') ? 'FavoritesName' : 'favoritesName';
            return favoriteModel.get(attr);
        };

        FavoritesCollection.prototype.sync = function(method, collection, options) {
            var manager = FavoritesDatabaseManager.getInstance();
            options.callback = options.callback || null;

            console.log('FavoritesCollection sync', method, collection);

            switch(method) {
                case 'read':
                    manager.getFavoritesSearchValue(function(favorites) {
                        collection.reset(favorites);
                    });
                    break;
                default:
                    Backbone.synce.apply(this, arguments);
            }
        };

        return FavoritesCollection;

    })(Backbone.Collection);


    return FavoritesCollection;
});