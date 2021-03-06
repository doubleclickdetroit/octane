define([ './DatabaseManager' ],
function(DatabaseManager) {

    'use strict';


    var SearchDetailsDatabaseManager;
    SearchDetailsDatabaseManager = (function() {

        var database;

        /*
         * Insert search data into the SearchDetails table
         *
         * @param : contain settings data-object
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function insertSearchDetails(data, callback, context) {
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
                    ], function() {
                        if (callback) {
                            callback.call(context || window);
                        }
                    });
                }, database.error);
            }
        }

        /*
         * Get the default search data
         *
         * @param : function
         * @param : [context for this]
         * @return: none
        */
        function getDefaultSearchValue(callback, context) {
            if (callback) {
                var sql, db = database.openDatabase();
                sql = "SELECT * FROM SearchDetails WHERE ViewMode = 'default'";

                db.transaction(function(tx) {
                    tx.executeSql(sql, [], function(tx, results) {
                        callback.call(context || window, results.rows);
                    }, database.error);
                }, database.error);
            }
        }

        /*
         * Function to delete data from search Results where view mode is default </summary>
         *
         * @param : function
         * @param : [context for this]
        */
        function deleteDefaultSearchData(callback, context) {
            var sql, db = database.openDatabase();
            sql = "DELETE FROM SearchDetails WHERE ViewMode = 'default'";

            db.transaction(function(tx) {
                tx.executeSql(sql, [], function() {
                    if (callback) { callback.call(context || window); }
                }, database.error);
            }, database.error);
        }


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchDetailsDatabaseManager() {
            database = DatabaseManager.getInstance();
        }

        /*
         * Public Methods
        */
        SearchDetailsDatabaseManager.prototype.insertSearchDetails     = insertSearchDetails;
        SearchDetailsDatabaseManager.prototype.getDefaultSearchValue   = getDefaultSearchValue;
        SearchDetailsDatabaseManager.prototype.deleteDefaultSearchData = deleteDefaultSearchData;

        return SearchDetailsDatabaseManager;
    })();


    // return as Singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new SearchDetailsDatabaseManager();
                }
                return __instance;
            }
        };
    }();
});