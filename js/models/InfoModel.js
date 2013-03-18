define([ 'backbone', 'globals'],
function (Backbone, globals) {

    'use strict';


    var InfoModel;
    InfoModel = Backbone.Model.extend({

        defaults: {
            'buildVersion': 'Unknown',
            'osVersion'   : 'Unknown',
            'deviceId'    : 'Unknown',
            'screenType'  : 'Unknown'
        },

        initialize: function (attrs, options) {
            // initially bootstrap data
            this.set({
                'buildVersion': globals.APP.VERSION,
                'osVersion'   : this.getOsVersion(options.device),
                'deviceId'    : this.getDeviceId(),       // can 'MyCls' be encapsulated within AppModel? If so, these could be as simple as referencing options.device for the property or method that uses 'MyCls' plug-in.
                'screenType'  : this.getScreenType()      // can 'MyCls' be encapsulated within AppModel? If so, these could be as simple as referencing options.device for the property or method that uses 'MyCls' plug-in.
            });
        },

        /*
         * Private Methods
        */
        getOsVersion: function (device) {
        	var v = device.version,
            	p = device.platform;
        	
        	return p && v ? p+' '+v : 'Unknown';
        },
        
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


    return InfoModel;

});