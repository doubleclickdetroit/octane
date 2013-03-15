define([ 'utils', 'facade', 'views/FeedbackView', 'models/FeedbackModel' ],
function (utils, facade, FeedbackView, FeedbackModel) {

    'use strict';


    var FeedbackController;
    FeedbackController = (function () {

        var feedbackView, feedbackModel;
        
        /*
         * Public Methods
        */
        function init() {
        	
        	// create model
        	feedbackModel = new FeedbackModel();

            // create view
        	feedbackView = new FeedbackView({
                model: feedbackModel
            });
            
        }
        
        function navigate() {
            utils.changePage(feedbackView.$el);
        }
        
        function updateAttribute(id, val) {
        	feedbackModel.updateAttribute(id, val);
        }

        function saveAttributes() {
            feedbackModel.saveAttributes();
        }
        
        function handleSaveSuccess() {
        	feedbackView.displaySubmitConfirmation();
        }
        
        function handleDismissConfirmation() {
        	// on dismiss navigate back to Settings
        	facade.publish('settings', 'navigate');
        }

        return {
            init: init,
            navigate: navigate,
            updateAttribute: updateAttribute,
            saveAttributes: saveAttributes,
            handleSaveSuccess: handleSaveSuccess,
            handleDismissConfirmation: handleDismissConfirmation
        };
    })();


    return FeedbackController;
});