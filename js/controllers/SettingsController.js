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
            settingsView = new SettingsView();
        };

        /*
         * Public Methods
        */
        SettingsController.prototype.navigate = function() {
            utils.changePage(settingsView.$el);
        };

        return SettingsController;
    })();


    return new SettingsController();
});