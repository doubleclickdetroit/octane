define([ 'globals', 'utils', 'backbone' ],
function(globals, utils, Backbone) {

    'use strict';


    var AppModel;
    AppModel = (function(_super) {

        /*
         * Private Methods
        */
        function getDeviceId() {
            if (typeof window.MyCls !== 'undefined' && window.MyCls.getDeviceId() !== null) {
                return window.MyCls.getDeviceId();
            }
        }

        function getScreenType() {
            var screenType = 'Unknown';

            if (typeof window.MyCls !== 'undefined' && window.MyCls.getScreenDensity() !== null) {
                switch (window.MyCls.getScreenDensity().toString()) {
                    case '.75':
                        screenType = 'ldpi';
                        break;
                    case '1':
                        screenType = 'mdpi';
                        break;
                    case '1.5':
                        screenType = 'hdpi';
                        break;
                    case '2':
                        screenType = 'xdpi';
                        break;
                }
            }

            return screenType;
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(AppModel, _super);

        function AppModel() {
            AppModel.__super__.constructor.apply(this, arguments);
        }

        AppModel.prototype.defaults = {
            'available'   : null,
            'name'        : null,
            'platform'    : 'Unknown',
            'version'     : 'Unknown',
            'model'       : null,
            'uuid'        : null,
            'cordova'     : null,
            'deviceId'    : 'Unknown',
            'screenType'  : 'Unknown',
            'buildVersion': 'Unknown',
            'appOpenCount': null,
            'isAppRated'  : null
        };

        AppModel.prototype.initialize = function() {
            var d = window.device || {};

            // bootstrap device data
            this.set(utils._.extend(d, {
            	'deviceId'    : getDeviceId(),
            	'screenType'  : getScreenType(),
            	'buildVersion': globals.APP.VERSION
            }));

            // Fetch to sync the model with the local database
            this.fetch();

            // Increment the App Open Count
            if (this.get('appOpenCount') != null) {
                this.set('appOpenCount', parseInt(this.get('appOpenCount')) + 1);

                // Set the ID so it's clear this model is NOT New
                this.set('id', 1);
            }

            this.save();
        };

        AppModel.prototype.sync = function (method, model, options) {
            switch (method) {
                case 'update':
                    localStorage.setItem(globals.RATE_IT.APPLICATION_COUNT, model.get('appOpenCount'));
                    localStorage.setItem(globals.RATE_IT.IS_RATED, model.get('isAppRated'));
                    break;

                case 'create':
                    localStorage.setItem(globals.RATE_IT.APPLICATION_COUNT, 1);
                    localStorage.setItem(globals.RATE_IT.IS_RATED, null);
                    // fall through to execute the read case as well
                case 'read':
                    model.set({
                        'appOpenCount': localStorage.getItem(globals.RATE_IT.APPLICATION_COUNT),
                        'isAppRated'  : localStorage.getItem(globals.RATE_IT.IS_RATED)
                    });
                    break;

                case 'delete':
                    break;
            }

            // make sure the model is in sync with the local database
            model.set({
               'appOpenCount': localStorage.getItem(globals.RATE_IT.APPLICATION_COUNT),
               'isAppRated'  : localStorage.getItem(globals.RATE_IT.IS_RATED)
            });
        };

        return AppModel;

    })(Backbone.Model);


    // Make singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new AppModel();
                }
                return __instance;
            }
        };
    }();
});