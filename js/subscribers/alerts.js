define([ 'facade', 'controllers/AlertsController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('alerts');

    //
    subscribe('navigate', controller.navigate);

    //
    subscribe('updateAttribute', controller.updateAttribute);

    //
    subscribe('saveAttributes', controller.saveAttributes);

    //
    subscribe('resetAttributes', controller.resetAttributes);


    return {
        init: controller.init
    }
});