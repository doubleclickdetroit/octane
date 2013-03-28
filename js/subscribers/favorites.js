define([ 'facade', 'controllers/FavoritesController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('favorites', controller);

    //
    subscribe('navigate', 'navigate');

    //
    subscribe('save', 'saveFavorite');


    return {
        init: function() {
            controller.init();
        }
    };
});