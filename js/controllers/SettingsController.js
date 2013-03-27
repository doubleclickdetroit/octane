define([ 'utils', 'models/BackboneModel', 'views/SettingsView' ],
function(utils, BackboneModel, SettingsView) {

    'use strict';


    var SettingsController;
    SettingsController = (function() {

        var settingsViewModel, settingsView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SettingsController() {}
        SettingsController.prototype.init = function() {
            // cache model & view instances
            settingsViewModel = new BackboneModel();

            settingsView = new SettingsView({
                model: settingsViewModel
            });
        };

        /*
         * Public Methods
        */
        SettingsController.prototype.navigate = function() {
            utils.changePage(settingsView.$el, null, null, true); // force updateHash
        };

        SettingsController.prototype.updateSettingsViewModelAttributes = function(attributes) {
            settingsViewModel.set(attributes);
        };

        return SettingsController;
    })();


    return new SettingsController();
});