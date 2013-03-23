define([ 'facade', 'controllers/SearchController' ],
function(facade, controller) {

    'use strict';


    /*
     * Search Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('search', controller);

    //
    subscribe('navigate', 'navigate');

    //
    subscribe('beforeRender', 'resetSearchViewModel');

    //
    subscribe('updateSearchByValue', 'updateSearchByAttribute');


    /*
     * SearchDetails Subscribers
    */
    facade.subscribe('criteria', 'change', controller, 'updateCriteria');


    return {
        init: function() {
            controller.init();
        }
    };
});