define([ 'facade', 'controllers/ForecastController' ],
function(facade, controller) {

    'use strict';


    /*
     * Forecast Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('forecast', controller);

    subscribe('navigate', 'navigate');
    subscribe('updateAttribute', 'updateAttribute');
    subscribe('saveAttributes', 'saveAttributes');


    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'change', controller, 'updateCriteria');


    return {
        init: controller.init
    };
});