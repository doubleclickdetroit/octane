define([ 'utils', 'facade', 'views/FeedbackView', 'models/FeedbackModel', 'models/AppModel' ],
function (utils, facade, FeedbackView, FeedbackModel, AppModel) {

    'use strict';


    var FeedbackController;
    FeedbackController = (function () {

        var feedbackView, feedbackModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function FeedbackController() {}
        FeedbackController.prototype.init = function() {
            // create model
            feedbackModel = new FeedbackModel(null, {
                device: AppModel.getInstance().toJSON()
            });

            // create view
            feedbackView = new FeedbackView({
                model: feedbackModel
            });
        };

        /*
         * Public Methods
        */
        FeedbackController.prototype.navigate = function() {
            utils.changePage(feedbackView.$el);
        };

        FeedbackController.prototype.updateAttribute = function(id, val) {
        	feedbackModel.updateAttribute(id, val);
        };

        FeedbackController.prototype.saveAttributes = function() {
            feedbackModel.saveAttributes();
        };

        FeedbackController.prototype.handleSaveSuccess = function() {
        	feedbackView.displaySubmitConfirmation();
        };

        FeedbackController.prototype.handleDismissConfirmation = function() {
        	// on dismiss navigate back to Settings
        	facade.publish('settings', 'navigate');
        };

        return FeedbackController;
    })();


    return new FeedbackController();
});