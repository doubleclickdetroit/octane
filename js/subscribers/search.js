define([ 'facade', 'controllers/SearchController' ],
function(facade, controller) {

    'use strict';


    /*
     * Search Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('search', controller);

    subscribe('navigate',        'navigate', controller.beforeNavigateCondition);
    subscribe('beforeRender',    'resetSearchViewModel');
    subscribe('updateAttribute', 'updateAttribute');
    subscribe('saveCriteria',    'saveSearchCriteriaModel');


    return {
        init: function() {
            controller.init();
        }
    };
});