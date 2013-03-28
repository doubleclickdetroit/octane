define([ 'facade', 'controllers/SearchDetailsController' ],
function(facade, controller) {

    'use strict';


    /*
     * SearchDetails Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('criteria', controller);

    //
    facade.subscribe('criteria', 'save', controller, 'saveAttributes');

    //
    facade.subscribe('criteria', 'update', controller, 'updateAttributes');


    /*
     * Location Subscribers
    */
    //
    facade.subscribe('location', 'change', controller, 'updateLocationAttributes');


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
                facade.publish('criteria', 'change', model.toJSON());
                break;
        }
    };

    return {
        init: function() {
            controller.init(delegate);
        }
    };
})