define([ 'facade', 'controllers/FeedbackController' ],
function (facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('feedback', controller);

    subscribe('navigate',            'navigate');
    subscribe('updateAttribute',     'updateAttribute');
    subscribe('saveAttributes',      'saveAttributes');
    subscribe('saveSuccess',         'handleSaveSuccess');
    subscribe('dismissConfirmation', 'handleDismissConfirmation');


    return {
        init: function() {
            controller.init();
        }
    };
});