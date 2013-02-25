define([ 'utils', 'views/settings' ],
function(utils, settingsView) {

    'use strict';


    var settingsModule;
    settingsModule = (function() {

        function navigate(id) {
            console.log('settings.navigate ' + (id || ''));
            utils.changePage('#settings', null, null, false);
        }

        function navigateCondition(id) {
            if (id === 'share') {
                if (confirm('Are you sure you want to?') === false) {
                    utils.navigate('#menu');
                    return false;
                }
            }

            return true;
        }

        return {
            navigate: navigate,
            navigateCondition: navigateCondition
        };

    })();


    return settingsModule;
});