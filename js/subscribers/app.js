define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('app');

    //
    subscribe('ready', controller.ready);


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