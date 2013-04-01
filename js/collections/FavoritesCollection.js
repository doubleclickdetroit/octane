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

        FavoritesCollection.prototype.isEditable = false;

        // Define Model to use
        FavoritesCollection.prototype.model = FavoriteModel;

        // Sorting
        FavoritesCollection.prototype.comparator = function(favoriteModel) {
            return favoriteModel.get('favoritesName');
        };

        FavoritesCollection.prototype.sync = function(method, collection, options) {
            var manager = FavoritesDatabaseManager.getInstance();
            options.callback = options.callback || null;

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