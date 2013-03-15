define([ 'utils', 'views/SettingsView' ],
function(utils, SettingsView) {

    'use strict';


    var SettingsController;
    SettingsController = (function() {

        var settingsView;

        function init() {
            settingsView = new SettingsView();
        };

        function navigate() {
            utils.changePage(settingsView.$el, null, null, true);
        };

        return {
            init    : init,
            navigate: navigate
        }
    })();


    return SettingsController;
});