define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('app');

    //
    subscribe('ready', controller.ready);


    // Initialize the controller
    controller.init();
});