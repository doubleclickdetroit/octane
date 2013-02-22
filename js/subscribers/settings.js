define([ 'facade', 'modules/settings' ],
function(facade, settingsModule) {

    'use strict';


    function subscribe(id, callback, condition) {
        facade.subscribe('settings', id, callback, condition);
    }

    //
    subscribe('navigate', settingsModule.navigate, settingsModule.navigateCondition);
});