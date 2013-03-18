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
            var v = options.device.version,
            	p = options.device.platform;
       	
            // initially bootstrap data
            this.set({
                'buildVersion': options.device.buildVersion,
                'deviceId'    : options.device.deviceId,
                'screenType'  : options.device.screenType,
                'osVersion'   : p && v ? p + ' ' + v : 'Unknown'
            });
        }
        
    });

    return InfoModel;

});
