define([ './DatabaseManager' ],
function(DatabaseManager) {

    'use strict';


    var FavoritessDatabaseManager;
    FavoritessDatabaseManager = (function() {

        var database;

        /*
         * Get Favorites
         *
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function getFavoritesSearchValue(callback, context) {
            if (callback) {
                var sql, db = database.openDatabase();
                sql = "SELECT * FROM SearchDetails WHERE ViewMode = 'favorites' ORDER BY FavoritesName";

                db.transaction(function(tx) {
                    tx.executeSql(sql, [], function(tx, results) {
                        callback.call(context || window, results.rows);
                    }, database.error);
                }, database.error);
            }
        }

        /*
         * Get Favorite by Id
         *
         * @param : number, string
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function getFavoritesSearchId(favoriteId, callback, context) {
            if (callback) {
                var sql, db = database.openDatabase();
                sql = "SELECT * FROM SearchDetails WHERE Id = '"
                    + favoriteId
                    + "' ORDER BY FavoritesName";

                db.transaction(function(tx) {
                    tx.executeSql(sql, [], function(tx, results) {
                        callback.call(context || window, results.rows);
                    }, database.error);
                }, database.error);
            }
        }

        /*
         * Delete Favorite
         *
         * @param : number, string
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function deleteFavoriteSearchData(favoriteId, callback, context) {
            var sql, db = this.openDatabase();
            sql = "DELETE FROM SearchDetails WHERE Id ='" + favoriteId + "'";

            db.transaction(function(tx) {
                tx.executeSql(sql, [], function() {
                    if (callback) { callback.call(context || window); }
                }, database.error);
            }, database.error);
        }


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FavoritessDatabaseManager() {
            database = DatabaseManager.getInstance();
        }

        /*
         * Public Methods
        */
        FavoritessDatabaseManager.prototype.getFavoritesSearchValue  = getFavoritesSearchValue;
        FavoritessDatabaseManager.prototype.getFavoritesSearchId     = getFavoritesSearchId;
        FavoritessDatabaseManager.prototype.deleteFavoriteSearchData = deleteFavoriteSearchData;

        return FavoritessDatabaseManager;
    })();


    // return as Singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new FavoritessDatabaseManager();
                }
                return __instance;
            }
        };
    }();
});