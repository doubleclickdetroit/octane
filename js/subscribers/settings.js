define([ 'facade', 'controllers/settings' ],
function(facade, controller) {

    'use strict';


    function subscribe(id, callback, condition) {
        facade.subscribe('settings', id, callback, condition);
    }

    //
    subscribe('navigate', controller.navigate, controller.navigateCondition);
});