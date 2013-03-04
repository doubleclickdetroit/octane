define([ './SearchDetailsDatabaseManager' ],
function(SearchDetailsDatabaseManager) {

    'use strict';


    var FuelsiteServiceManager;
    FuelsiteServiceManager = (function() {

        var searchDetails;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FuelsiteServiceManager() {
            searchDetails = SearchDetailsDatabaseManager.getInstance();
            searchDetails.getDefaultSearchValue(function(results) {
                console.log('getDefaultSearchValue', results);
            });
        }

        /*
         * Public Methods
        */

        return FuelsiteServiceManager;
    })();


    // return as Singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new FuelsiteServiceManager();
                }
                return __instance;
            }
        };
    }();
});