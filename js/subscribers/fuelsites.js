define([ 'facade', 'controllers/FuelSitesController' ],
function(facade, controller) {

    'use strict';


    /*
     * FuelSites Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('fuelsites', controller);

    //
    subscribe('navigate',         'navigate');
    subscribe('selectedFuelSite', 'showFuelSite');


    /*
     * Location Subscribers
    */
    facade.subscribe('location', 'loadingbegin', controller, 'loadingBegin');
    facade.subscribe('location', 'loadingend', controller, 'loadingEnd');

    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'change',       controller, 'updateCriteria');
    facade.subscribe('criteria', 'loadingbegin', controller, 'loadingBegin');
    facade.subscribe('criteria', 'loadingend', controller, 'loadingEnd');


    return {
        init: function() {
            controller.init();
        }
    };
});