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

        FavoritesCollection.prototype.parse = function(favorites) {
            console.log('FavoritesCollection parse', favorites);
            return favorites;
        };

        FavoritesCollection.prototype.sync = function(method, model, options) {
            var manager = FavoritesDatabaseManager.getInstance();
            options.callback = options.callback || null;

            console.log('FavoritesCollection sync', method, model, options);

            switch(method) {
                case 'create':
                    manager.insertSearchDetails(model.toJSON(), options.callback);
                    break;
                case 'read':
                    manager.getFavoritesSearchValue(options.callback);
                    break;
                default:
                    Backbone.synce.apply(this, arguments);
            }
        };

        return FavoritesCollection;

    })(Backbone.Collection);


    return FavoritesCollection;
});