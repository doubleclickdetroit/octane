define([ 'facade', 'modules/app' ],
function(facade, appModule) {

    'use strict';


    facade.subscribe('app', 'ready', appModule.ready);
});