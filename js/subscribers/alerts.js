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
    subscribe('updateAttribute', controller.updateAttribute);

    //
    subscribe('saveAttributes', controller.saveAttributes);

    //
    subscribe('resetAttributes', controller.resetAttributes);


    // Initialize the controller
    controller.init();
});