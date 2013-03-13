define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    //
    facade.subscribe('app', 'ready', controller.ready);

    //
    facade.subscribe('location', 'getAddressLocation', controller.locateFromAddress);

    //
    facade.subscribe('location', 'getCurrentLocation', controller.locateFromCurrentLocation);


    /*
     * Delegates
    */
    controller.locationModelDelegate(function(evt, model) {
        switch(evt) {
            case 'loadingstart':
                facade.publish('location', 'loadingstart');
                break;
            case 'loadingend':
                facade.publish('location', 'loadingend');
                break;
            case 'change':
                facade.publish('location', 'update', model.toJSON());
                break;
        }
    });

    controller.searchDetailsModelDelegate(function(evt, model) {
        switch(evt) {
            case 'loadingstart':
                facade.publish('criteria', 'loadingstart');
                break;
            case 'loadingend':
                facade.publish('criteria', 'loadingend');
                break;
            case 'change':
                facade.publish('criteria', 'update', model.toJSON());
                break;
        }
    });


    return {
        init: controller.init
    };
});