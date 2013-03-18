define([ 'underscore', 'globals', 'backbone' ],
function(_, globals, Backbone) {

    'use strict';


    var AppModel;
    AppModel = Backbone.Model.extend({

        defaults: {
            'available'   : null,
            'name'        : null,
            'platform'    : 'Unknown',
            'version'     : 'Unknown',
            'model'       : null,
            'uuid'        : null,
            'cordova'     : null,
            'deviceId'    : 'Unknown',
            'screenType'  : 'Unknown',
            'buildVersion': 'Unknown'
        },

        initialize: function() {
            var d = window.device || {};

            // bootstrap device data
            this.set(_.extend(d, {
            	'deviceId'    : this.getDeviceId(),
            	'screenType'  : this.getScreenType(),
            	'buildVersion': globals.APP.VERSION
            }));
        },
        
        /*
         * Private Methods
        */
        
        getDeviceId: function () {
            if (typeof window.MyCls !== 'undefined' && window.MyCls.getDeviceId() !== null) {
                return window.MyCls.getDeviceId();
            }
        },

        getScreenType: function () {
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

    });


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