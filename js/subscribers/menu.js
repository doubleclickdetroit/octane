define([ 'facade', 'controllers/menu' ],
function(facade, controller) {

    'use strict';


    facade.subscribe('menu', 'navigate', controller.navigate);
});