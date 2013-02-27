define([ 'helpers/DatabaseManager' ],
function(DatabaseManager) {

    'use strict';


    var database, handlers = {};
    database = DatabaseManager.getInstance();

    handlers.dropForecastAlertTable = function() {
        var db = database.openDatabase();
        db.transaction(function deleteFuelTypes(tx) {
            tx.executeSql('DELETE FROM ForecastAlert');
        }, database.error, function() { console.log('** dropForecastAlertTable'); });
    };


    /*
     * Get the Forecast Alert settings
     *
     * @parameter: contains success callback function
     * @return   : none
    */
    handlers.getForecastAlert = function (callback) {
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
     * @parameter: contains alert data object
     * @return   : none
    */
    handlers.setForecastAlert = function(data, callback) {
        var db = database.openDatabase();
        callback = callback || function(){};

        if (data) {

            // See if a ForecastAlert record already exists
            handlers.getForecastAlert(function (tx, results) {

                var sql;

                // If there's already a ForecastAlert record, update it
                if (results.rows.length > 0) {
                    sql = 'UPDATE ForecastAlert SET FuelType = ?, Location = ?, ForecastChange = ?';
                    db.transaction(function (transaction) {
                        console.log('setForecastAlert UPDATE ' + data.fuelType + ' ' + data.location + ' ' + data.forecastChange);
                        transaction.executeSql(sql, [data.fuelType, data.location, data.forecastChange]);
                    }, database.onError, callback);
                }

                // else, insert a new record
                else {
                    sql = 'INSERT INTO ForecastAlert (FuelType, Location, ForecastChange) VALUES (?, ?, ?)';
                    db.transaction(function (transaction) {
                        console.log('setForecastAlert INSERT ' + data.fuelType + ' ' + data.location + ' ' + data.forecastChange);
                        transaction.executeSql(sql, [data.fuelType, data.location, data.forecastChange]);
                    }, database.onError, callback);
                }
            });
        }
    };

    /*
     * Delete data from the ForecastAlert table
     *
     * @parameter: contain SQLTransaction Object
     * @return   : none
    */
    handlers.deleteForecastAlert = function(callback) {
        var sql, db = database.openDatabase();
        sql = 'DELETE FROM ForecastAlert';
        callback = callback || function(){};

        db.transaction(function (transaction) {
            transaction.executeSql(sql);
        }, database.onError, callback);
    };


    return handlers;
});