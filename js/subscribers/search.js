define([ 'facade', 'controllers/SearchController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('search', controller);

    //
    subscribe('navigate', 'navigate');


    return {
        init: function() {
            controller.init();
        }
    };
});