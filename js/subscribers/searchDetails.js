define([ 'facade', 'controllers/SearchDetailsController' ],
function(facade, controller) {

    'use strict';


    /*
     * SearchDetails Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('criteria', controller);

    //
    subscribe('load', 'loadAttributes');

    //
    subscribe('update', 'updateAttributes');

    //
    subscribe('save', 'saveAttributes');


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
            case 'withoutDefaultSearchValue':
                facade.publish('location', 'getCurrentLocation');
                break;
        }
    };

    return {
        init: function() {
            controller.init(delegate);
        }
    };
})