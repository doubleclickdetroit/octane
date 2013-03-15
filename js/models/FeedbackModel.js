define([ 'backbone', 'globals', 'facade', 'utils'],
function (Backbone, globals, facade, utils) {

    'use strict';


    var FeedbackModel;
    FeedbackModel = Backbone.Model.extend({

    	defaults: {
        	'sender'         : null,
        	'subject'        : globals.feedback.constants.WEBSERVICE.SUBJECT,
        	'messageBody'    : null,
        	'devicePlatform' : window.device ? device.platform : 'Unknown',
        	'deviceVersion'  : window.device ? device.version  : 'Unknown',
        	'appBuildVersion': globals.APP.VERSION
        },

        // Build the URL for the RESTful web service that receives the Feedback
        url: function () {

        	var url, data;

        	url = globals.feedback.constants.WEBSERVICE.URL;
        	data = this.toJSON();

        	if (data) {

        		// Add the model attributes as query string params to the URL
	        	url += '?' + $.param(data);

        	}

        	return url;
        },

        validate: function (attrs, options) {
        	// Validate the required fields were supplied
        	if (!attrs.sender && !attrs.messageBody) {
        		return globals.feedback.constants.ERROR_ALL_FIELDS_REQUIRED;
        	}
        	else if (!attrs.sender) {
        		return globals.feedback.constants.ERROR_EMAIL_REQUIRED_FIELD;
        	}
        	else if (!attrs.messageBody) {
        		return globals.feedback.constants.ERROR_FEEDBACK_REQUIRED_FIELD;
        	}

        	// Validate that sender is in a valid email address format
        	if (!utils.isEmailAddressValid(attrs.sender)) {
        		return globals.feedback.constants.ERROR_EMAIL_INVALID;
        	}
        },

        /*
         * Private Methods
        */
        handleSaveSuccess: function (model, response, options) {
    		model.set(model.defaults);
    		facade.publish('feedback', 'saveSuccess');
        },

        /*
         * Public Methods
        */
        updateAttribute: function (key, val) {
        	this.set(key, val);
        },

        saveAttributes: function () {
            this.save(this.toJSON(), {success: this.handleSaveSuccess});
        }

    });


    return FeedbackModel;

});