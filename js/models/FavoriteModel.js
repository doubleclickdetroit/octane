define([ 'globals', 'utils', 'backbone', 'managers/FavoritesDatabaseManager' ],
function(globals, utils, Backbone, FavoritesDatabaseManager) {

    'use strict';


    var FavoriteModel;
    FavoriteModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FavoriteModel, _super);

        function FavoriteModel() {
            FavoriteModel.__super__.constructor.apply(this, arguments);
        }

        FavoriteModel.prototype.sync = function(method, model, options) {
            var manager = FavoritesDatabaseManager.getInstance();
            options.callback = options.callback || null;

            console.log('FavoriteModel sync', method, model);

            switch(method) {
                case 'create':
                case 'update':
                    manager.insertFavoriteSearchDetails(model.toJSON(), options.callback);
                    break;
                case 'read':
                    manager.getFavoritesSearchId(model.get('id'), options.callback);
                    break;
                case 'delete':
                    manager.deleteFavoriteSearchData(model.get('id'), options.callback);
                    break;
            }
        };

        FavoriteModel.prototype.parse = function(attributes) {
            console.log('parse', attributes);
            return attributes;
        };

        return FavoriteModel;

    })(Backbone.Model);


    return FavoriteModel;
});