define([ './DatabaseManager' ],
function(DatabaseManager) {

    'use strict';


    var AlertsDatabaseManager;
    AlertsDatabaseManager = (function() {

        var database;

        /*
         * Get the Forecast Alert settings
         *
         * @param : contains success callback function
         * @return: none
        */
        function getForecastAlert(callback) {
            var sql, db = database.openDatabase();
            sql = 'SELECT * FROM ForecastAlert';
            callback = callback || function(){};

            db.transaction(function(tx) {
                tx.executeSql(sql, [], callback, database.onError);
            }, database.onError);
        };

        /*
         * Insert data into the ForecastAlert table
         * when a record does not yet exist, otherwise update the pre-existing record.
         * There should only be 1 record in the ForecastAlert table ever.
         *
         * @param : contains alert data object
         * @return: none
        */
        function setForecastAlert(data, callback) {
            var db = database.openDatabase();
            callback = callback || function(){};

            if (data) {

                // See if a ForecastAlert record already exists
                getForecastAlert(function (tx, results) {

                    var sql;

                    // If there's already a ForecastAlert record, update it
                    if (results.rows.length > 0) {
                        sql = 'UPDATE ForecastAlert SET FuelType = ?, Location = ?, ForecastChange = ?';
                        db.transaction(function (transaction) {
                            transaction.executeSql(sql, [data.fuelType, data.location, data.forecastChange]);
                        }, database.onError, callback);
                    }

                    // else, insert a new record
                    else {
                        sql = 'INSERT INTO ForecastAlert (FuelType, Location, ForecastChange) VALUES (?, ?, ?)';
                        db.transaction(function (transaction) {
                            transaction.executeSql(sql, [data.fuelType, data.location, data.forecastChange]);
                        }, database.onError, callback);
                    }
                });
            }
        };

        /*
         * Delete data from the ForecastAlert table
         *
         * @param : contain SQLTransaction Object
         * @return: none
        */
        function deleteForecastAlert(callback) {
            var sql, db = database.openDatabase();
            sql = 'DELETE FROM ForecastAlert';
            callback = callback || function(){};

            db.transaction(function (transaction) {
                transaction.executeSql(sql);
            }, database.onError, callback);
        };


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function AlertsDatabaseManager() {
            database = DatabaseManager.getInstance();
        }

        /*
         * Public Methods
        */
        AlertsDatabaseManager.prototype.getForecastAlert    = getForecastAlert;
        AlertsDatabaseManager.prototype.setForecastAlert    = setForecastAlert;
        AlertsDatabaseManager.prototype.deleteForecastAlert = deleteForecastAlert;

        return AlertsDatabaseManager;
    })();


    // return as Singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new AlertsDatabaseManager();
                }
                return __instance;
            }
        };
    }();
});