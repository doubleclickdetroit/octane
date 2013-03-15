define([ 'facade', 'controllers/FeedbackController' ],
function (facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('feedback');

    //
    subscribe('navigate', controller.navigate);
    
    //
    subscribe('updateAttribute', controller.updateAttribute);

    //
    subscribe('saveAttributes', controller.saveAttributes);
    
    //
    subscribe('saveSuccess', controller.handleSaveSuccess);
    
    //
    subscribe('dismissConfirmation', controller.handleDismissConfirmation);


    return {
        init: controller.init
    };
});