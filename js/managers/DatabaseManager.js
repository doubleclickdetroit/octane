define([ 'globals', 'facade' ],
function(globals, facade) {

    'use strict';


    var DatabaseManager;
    DatabaseManager = (function() {

        var __database = null;

        /*
         * Private Methods
        */
        function createAllTables() {
            var db = this.openDatabase();
            db.transaction(createTables, handle_error, handle_success);
        }

        function createTables(tx) {
            if (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS FuelTypes (Id , FuelType)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Brands (Id , Name,ImagePath)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS RadiusDetails (Id , RadiusValue)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Settings (Counter)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS SearchDetails (Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                                       'SearchBy, Location, Latitude, Longitude, Radius, FuelType, UpdatedResult, ' +
                                       'SortBy, Brand, ViewMode, LimitResult, FavoritesName)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS ForecastAlert (FuelType, Location, ForecastChange)');
            }
        }

        function handle_success() {
            //
        }

        function handle_error(error) {
            if (error) {
                navigator.notification.alert('Error' + error.message, null, 'Error processing SQL:', 'OK');
            }
        }

        /*
         * DatabaseManager Class
        */
        function DatabaseManager() {
            createAllTables.call(this);
            return this;
        }

        /*
         * Public Methods
        */
        DatabaseManager.prototype.openDatabase = function() {
            var definition = globals.DATABASE;

            if (__database === null) {
                __database = window.openDatabase(
                    definition.DATABASE_NAME,
                    definition.DATABASE_VERSION,
                    definition.DATABASE_DISPLAY_NAME,
                    definition.TIMEOUT
                );
            }
            return __database;
        };

        DatabaseManager.prototype.cleanTables = function() {
            var db = this.openDatabase();
            facade.publish('database', 'cleancleanTables', db.transaction);
        };

        DatabaseManager.prototype.onError   = handle_error;
        DatabaseManager.prototype.onSuccess = handle_success;


        return DatabaseManager;
    })();


    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new DatabaseManager();
                }
                return __instance;
            }
        };
    }();
});