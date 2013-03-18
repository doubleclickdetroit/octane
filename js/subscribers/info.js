define([ 'facade', 'controllers/InfoController' ],
function (facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('info', controller);

    //
    subscribe('navigate', 'navigate');


    return {
        init: controller.init
    };
});