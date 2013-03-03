define([ 'facade', 'controllers/ForecastController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('forecast');

    //
    subscribe('navigate', controller.navigate);

    //
    subscribe('updateAttribute', controller.updateAttribute);

    //
    subscribe('saveAttributes', controller.saveAttributes);


    return {
        init: controller.init
    };
});