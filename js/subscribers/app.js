define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    //
    facade.subscribe('app', 'ready', controller.ready);


    return {
        init: controller.init
    };
});