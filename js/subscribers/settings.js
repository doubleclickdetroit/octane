define([ 'facade', 'controllers/SettingsController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('settings', controller);

    //
    subscribe('navigate', 'navigate');


    return {
        init: function() {
            controller.init();
        }
    };
});