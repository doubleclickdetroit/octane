define([ 'utils', 'views/SettingsView' ],
function(utils, settingsView) {

    'use strict';


    var SettingsController;
    SettingsController = (function() {

        function SettingsController() {}

        SettingsController.prototype.init = function(id) {
            //
        };

        SettingsController.prototype.navigate = function(id) {
            console.log('settings.navigate ' + (id || ''));
            utils.changePage('#settings', null, null, false);
        };

        SettingsController.prototype.navigateCondition = function(id) {
            if (id === 'share') {
                if (confirm('Are you sure you want to?') === false) {
                    utils.navigate('#menu');
                    return false;
                }
            }

            return true;
        };

        return SettingsController;

    })();


    return new SettingsController();
});