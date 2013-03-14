define([ 'facade', 'controllers/LocationController' ],
function(facade, controller) {

    'use strict';


    //
    facade.subscribe('location', 'getAddressLocation', controller.locateFromAddress);

    //
    facade.subscribe('location', 'getCurrentLocation', controller.locateFromCurrentLocation);


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
                facade.publish('location', 'update', model.toJSON());
                break;
        }
    };


    return {
        init: function() {
            controller.init(delegate);
        }
    };
});