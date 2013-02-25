define([ 'facade', 'controllers/alerts' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('alerts');

    //
    subscribe('navigate', controller.navigate);

    //
    subscribe('createPage', controller.createPage);

    //
    subscribe('renderView', controller.renderView);

    //
    subscribe('updateForecast', controller.updateForecast);
});