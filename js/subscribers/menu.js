define([ 'facade', 'controllers/MenuController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('menu', controller);

    //
    subscribe('navigate', 'navigate');


    return {
        init: controller.init
    };
});