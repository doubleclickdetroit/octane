define([ 'facade', 'modules/menu' ],
function(facade, menuModule) {

    'use strict';


    facade.subscribe('menu', 'navigate', menuModule.navigate);
});