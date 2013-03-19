define([ 'facade', 'controllers/FuelSitesController' ],
function(facade, controller) {

    'use strict';


    /*
     * FuelSites Subscribers
    */
    //
    facade.subscribe('fuelsites', 'navigate',         controller, 'navigate');
    facade.subscribe('fuelsites', 'selectedFuelSite', controller, 'showFuelSite');


    /*
     * Location Subscribers
    */
    facade.subscribe('location', 'loadingbegin', controller, 'loadingBegin');

    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'change',       controller, 'getFuelSites');
    facade.subscribe('criteria', 'loadingbegin', controller, 'loadingBegin');


    return {
        init: controller.init
    };
});