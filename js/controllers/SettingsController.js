define([ 'utils', 'views/SettingsView' ],
function(utils, SettingsView) {

    'use strict';


    var SettingsController;
    SettingsController = (function() {

        var settingsView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SettingsController() {}
        SettingsController.prototype.init = function() {
            // cache view instance
            settingsView = new SettingsView();
        };

        /*
         * Public Methods
        */
        SettingsController.prototype.navigate = function() {
            utils.changePage(settingsView.$el, null, null, true); // force updateHash
        };

        return SettingsController;
    })();


    return new SettingsController();
});