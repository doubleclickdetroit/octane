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

        initialize: function () {
            // initially bootstrap data
            this.loadDeviceInfo();
        },
        
        /*
         * Private Methods
        */
        loadDeviceInfo: function () {
        	this.set({
        		'buildVersion': this.getBuildVersion(),
            	'osVersion'   : this.getOSVersion(),
            	'deviceId'    : this.getDeviceId(),
            	'screenType'  : this.getScreenType()
        	});
        },
        
        getBuildVersion: function () {
        	return globals.APP.VERSION;
        },
        
        getOSVersion: function () {
        	if (device.platform && device.version) {
        		return device.platform + ' ' + device.version;
        	}
        	else {
        		return 'Unknown';
        	}
        },
        
        getDeviceId: function () {
        	if (typeof window.MyCls !== 'undefined' && window.MyCls.getDeviceId() !== null) {
        		return window.MyCls.getDeviceId();
        	}
        	else {
        		return 'Unknown';
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