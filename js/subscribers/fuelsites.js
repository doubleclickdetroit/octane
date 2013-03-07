define([ 'facade', 'controllers/FuelSitesController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('fuelsites');

    //
    subscribe('navigate', controller.navigate);


    return {
        init: controller.init
    };
});