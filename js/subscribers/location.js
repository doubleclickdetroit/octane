define([ 'facade', 'controllers/LocationController' ],
function(facade, controller) {

    'use strict';


    /*
     * Location Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('location', controller);

    //
    subscribe('getAddressLocation', 'locateFromAddress');

    //
    subscribe('getCurrentLocation', 'locateFromCurrentLocation');


    /*
     * Delegate
    */
    function delegate(evt, model) {
        switch(evt) {
            case 'loadingbegin':
                facade.publish('location', 'loadingbegin');
                break;
            case 'loadingend':
                facade.publish('location', 'loadingend');
                break;
            case 'change':
                facade.publish('location', 'change', model.toJSON());
                break;
        }
    };


    return {
        init: function() {
            controller.init(delegate);
        }
    };
});