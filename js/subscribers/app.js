define([ 'facade', 'controllers/app' ],
function(facade, controller) {

    'use strict';


    facade.subscribe('app', 'ready', controller.ready);
});