define([ 'facade', 'controllers/FuelSitesController' ],
function(facade, controller) {

    'use strict';


    /*
     * FuelSites Subscribers
    */
    facade.subscribe('fuelsites', 'navigate', controller.navigate);


    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'update',       controller.getFuelSites);
    facade.subscribe('criteria', 'loadingstart', controller.loadingStart);


    return {
        init: controller.init
    };
});