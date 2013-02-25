define([ 'facade', 'controllers/SettingsController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('settings');

    //
    subscribe('navigate', controller.navigate, controller.navigateCondition);


    // Initialize the controller
    controller.init();
});