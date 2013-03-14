define([ 'facade', 'controllers/SearchDetailsController' ],
function(facade, controller) {

    'use strict';


    //
    facade.subscribe('location', 'update', controller.updateLocationAttributes);


    /*
     * Delegate
    */
    function delegate(evt, model) {
        switch(evt) {
            case 'loadingbegin':
                facade.publish('criteria', 'loadingbegin');
                break;
            case 'loadingend':
                facade.publish('criteria', 'loadingend');
                break;
            case 'change':
                facade.publish('criteria', 'update', model.toJSON());
                break;
        }
    };

    return {
        init: function() {
            controller.init(delegate);
        }
    };
})