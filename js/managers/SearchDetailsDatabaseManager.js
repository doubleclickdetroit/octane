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
         * @return: none
        */
        function insertSearchDetails(data) {
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
                    ]);
                }, database.error);
            }
        }

        /*
         * Get the default search data
         *
         * @param : none
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
         * @param : none
         * @return: none
        */
        function deleteDefaultSearchData(callback) {
            var sql, db = database.openDatabase();
            sql = "DELETE FROM SearchDetails WHERE ViewMode = 'default'";
            db.transaction(function(tx) {
                tx.executeSql(sql, [], function() {
                    callback();
                }, database.error);
            }, database.error);
        }


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchDetailsDatabaseManager() {
            // console.log('SearchDetailsDatabaseManager init');
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