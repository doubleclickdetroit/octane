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


    return {
        init: function() {
            controller.init();
        }
    };
});