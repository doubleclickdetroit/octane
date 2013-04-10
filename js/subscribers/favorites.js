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


    return {
        init: function() {
            controller.init();
        }
    };
});