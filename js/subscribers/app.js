define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('app');

    //
    subscribe('ready', controller.ready);


    return {
        init: controller.init
    };
});