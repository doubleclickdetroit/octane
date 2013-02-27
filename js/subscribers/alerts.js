define([ 'facade', 'controllers/AlertsController' ],
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
    subscribe('saveAttributes', controller.saveAttributes);

    //
    subscribe('updateAttribute', controller.updateAttribute);

    //
    subscribe('destroyAttributes', controller.destroyAttributes);


    // Initialize the controller
    controller.init();
});