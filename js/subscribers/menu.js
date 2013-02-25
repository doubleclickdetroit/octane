define([ 'facade', 'controllers/MenuController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('menu');

    //
    subscribe('navigate', controller.navigate);


    // Initialize the controller
    controller.init();
});