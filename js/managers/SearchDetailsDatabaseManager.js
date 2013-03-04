define([ './DatabaseManager' ],
function(DatabaseManager) {

    'use strict';


    var SearchDetailsDatabaseManager;
    SearchDetailsDatabaseManager = (function() {

        var database;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchDetailsDatabaseManager() {
            database = DatabaseManager.getInstance();
            console.log('SearchDetailsDatabaseManager', database);
        }

        /*
         * Public Methods
        */
        SearchDetailsDatabaseManager.prototype.getDefaultSearchValue = function(callback) {
            if (callback) {
                var sql, db = database.openDatabase();
                sql = "SELECT * FROM SearchDetails WHERE ViewMode = 'default'";

                db.transaction(function(tx) {
                    tx.executeSql(sql, [], function(tx, results) {
                        callback(results.rows);
                    }, database.error);
                }, database.error);
            }
        };

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