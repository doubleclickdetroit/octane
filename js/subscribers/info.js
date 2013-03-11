define([ 'facade', 'controllers/InfoController' ],
function (facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('info');

    //
    subscribe('navigate', controller.navigate);


    return {
        init: controller.init
    };
});