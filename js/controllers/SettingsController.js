define([ 'utils', 'views/SettingsView' ],
function(utils, SettingsView) {

    'use strict';


    var SettingsController;
    SettingsController = (function() {

        function init() {
            var settingsView;
            settingsView = new SettingsView();
        };

        function navigate() {
            utils.changePage('#settings');
        };

        return {
            init    : init,
            navigate: navigate
        }
    })();


    return SettingsController;
});