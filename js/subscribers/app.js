define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe = facade.subscribeTo('app', controller);

    //
    subscribe('ready', 'ready');

    //
    subscribe('alert', 'alert');

    //
    subscribe('confirm', 'confirm');


    return {
        init: controller.init
    };
});