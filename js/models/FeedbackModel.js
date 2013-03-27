define([ 'globals', 'utils', 'facade', 'backbone'],
function(globals, utils, facade, Backbone) {

    'use strict';


    var FeedbackModel;
    FeedbackModel = (function(_super) {

        /*
         * Private Methods
        */
        function handleSaveSuccess(model, response, options) {
            // Reset the form fields
            model.set({
                'sender': null,
                'messageBody': null
            });

            facade.publish('feedback', 'saveSuccess'); // TODO: I think this should be this.trigger('saveSuccess') which the controller listens to and broadcasts :)
        }


        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FeedbackModel, _super);

        function FeedbackModel() {
            FeedbackModel.__super__.constructor.apply(this, arguments);
        }

        FeedbackModel.prototype.defaults = {
            'sender'         : null,
            'subject'        : globals.feedback.constants.WEBSERVICE.SUBJECT,
            'messageBody'    : null,
            'devicePlatform' : 'Unknown',
            'deviceVersion'  : 'Unknown',
            'appBuildVersion': globals.APP.VERSION
        };

        FeedbackModel.prototype.initialize = function(attrs, options) {
            this.set({
                'deviceVersion' : options.device.version,
                'devicePlatform': options.device.platform
            });
        };

        // Build the URL for the RESTful web service that receives the Feedback
        FeedbackModel.prototype.url = function () {
            var data = this.toJSON(),
                url  = globals.feedback.constants.WEBSERVICE.URL;

            // Add the model attributes as query string params to the URL
            if (data) url += '?' + $.param(data);

            return url;
        };

        FeedbackModel.prototype.validate = function (attrs, options) {
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
        };

        /*
         * Public Methods
        */
        FeedbackModel.prototype.updateAttribute = function (key, val) {
            this.set(key, val);
        };

        FeedbackModel.prototype.saveAttributes = function () {
            this.save(this.toJSON(), {
                success: handleSaveSuccess
            });
        };

        return FeedbackModel;

    })(Backbone.Model);


    return FeedbackModel;
});