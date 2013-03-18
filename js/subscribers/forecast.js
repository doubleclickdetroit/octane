define([ 'facade', 'controllers/ForecastController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('forecast', controller);

    //
    subscribe('navigate', 'navigate');

    //
    subscribe('updateAttribute', 'updateAttribute');

    //
    subscribe('saveAttributes', 'saveAttributes');


    return {
        init: controller.init
    };
});