define([ 'facade', 'controllers/AlertsController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('alerts', controller);

    //
    subscribe('navigate', 'navigate');

    //
    subscribe('updateAttribute', 'updateAttribute');

    //
    subscribe('saveAttributes', 'saveAttributes');

    //
    subscribe('resetAttributes', 'resetAttributes');


    return {
        init: controller.init
    };
});