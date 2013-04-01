define([ 'utils', './DatabaseManager' ],
function(utils, DatabaseManager) {

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
                        var rows = [];
                        for (var i=0; i < results.rows.length; i++) {
                            rows.push(utils.camelcaseKeys(results.rows.item(i)));
                        }
                        callback.call(context || window, rows);
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
         * Insert Favorite
         *
         * @param : contain settings data-object
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function insertFavoriteSearchDetails(data, callback, context) {
            var sql, db = database.openDatabase();
            sql = 'INSERT INTO SearchDetails ('
                + 'SearchBy, Location, Latitude, Longitude, Radius, FuelType, UpdatedResult, '
                + 'SortBy, Brand, ViewMode, LimitResult, FavoritesName) VALUES '
                + '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            if (data) {
                db.transaction(function(tx) {
                    tx.executeSql(sql, [
                        data.searchBy,
                        data.location,
                        data.latitude,
                        data.longitude,
                        data.radius,
                        data.fuelType,
                        data.updatedResult,
                        data.sortBy,
                        data.brand,
                        data.viewMode,
                        data.limitResult,
                        data.favoritesName
                    ], function(tx, result) {
                        callback && callback.call(context || window, {
                            'id': result.insertId
                        });
                    });
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
            var sql, db = database.openDatabase();
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
        FavoritessDatabaseManager.prototype.getFavoritesSearchValue     = getFavoritesSearchValue;
        FavoritessDatabaseManager.prototype.getFavoritesSearchId        = getFavoritesSearchId;
        FavoritessDatabaseManager.prototype.insertFavoriteSearchDetails = insertFavoriteSearchDetails;
        FavoritessDatabaseManager.prototype.deleteFavoriteSearchData    = deleteFavoriteSearchData;

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