define([ 'facade', 'controllers/SettingsController' ],
function(facade, controller) {

    'use strict';


    /*
     * Settings Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('settings', controller);

    subscribe('navigate', 'navigate');


    /*
     * Alerts Subscribers
    */
    facade.subscribe('alerts', 'notifications:change', controller, 'updateSettingsViewModelAttributes');


    return {
        init: function() {
            controller.init();
        }
    };
});