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


    return {
        init: function() {
            controller.init();
        }
    };
})