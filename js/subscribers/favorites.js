define([ 'facade', 'controllers/FavoritesController' ],
function(facade, controller) {

    'use strict';


    /*
     * Favorites Subscribers
    */
    var subscribe;
    subscribe = facade.subscribeTo('favorites', controller);

    //
    subscribe('navigate', 'navigate');

    //
    subscribe('prompt', 'promptFavorite');

    //
    subscribe('save', 'saveAttributes');

    //
    subscribe('remove', 'removeAttributes');

    //
    subscribe('editable', 'toggleEditFavorites');


    /*
     * Criteria Subscribers
    */
    facade.subscribe('criteria', 'change', controller, 'updateSearchCriteriaModel');


    return {
        init: function() {
            controller.init();
        }
    };
});