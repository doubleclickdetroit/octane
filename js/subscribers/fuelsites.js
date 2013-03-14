define([ 'facade', 'controllers/FuelSitesController' ],
function(facade, controller) {

    'use strict';


    /*
     * FuelSites Subscribers
    */
    //
    facade.subscribe('fuelsites', 'navigate', controller.navigate);


    /*
     * Location Subscribers
    */
    facade.subscribe('location', 'loadingbegin', controller.loadingBegin);

    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'update',       controller.getFuelSites);
    facade.subscribe('criteria', 'loadingbegin', controller.loadingBegin);


    return {
        init: controller.init
    };
});