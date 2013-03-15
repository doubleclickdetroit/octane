define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe = facade.subscribeTo('app');

    //
    subscribe('ready', controller.ready);

    //
    subscribe('alert', controller.alert);

    //
    subscribe('confirm', controller.confirm);


    return {
        init: controller.init
    };
});