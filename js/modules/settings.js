define([ 'utils', 'facade', 'views/settings' ],
function(utils, facade, settingsView) {

    'use strict';


    function navigate(id) {
        console.log('settings.navigate ' + (id || ''));
        utils.changePage('#settings', null, null, false);
    }

    //
    facade.subscribe('settings', 'navigate', navigate, function(id) {
        if (id === 'share') {
            if (!confirm('Are you sure you want to?')) {
                utils.navigate('#menu');
                return false;
            }
        }

        return true;
    });
});