define([ 'utils', 'facade', 'backbone' ],
function(utils, facade, Backbone) {

    'use strict';


    var AppRouter;
    AppRouter = new (Backbone.Router.extend({

        routes: {
            'settings(/)(:id)': 'renderSettings',
            'menu'            : 'renderMenu',
            ''                : 'root'
        },

        renderSettings: function(id) {
            facade.publish('settings', 'navigate', id || null);
        },

        renderMenu: function() {
            facade.publish('menu', 'navigate');
        },

        root: function() {
            facade.publish('menu', 'navigate');
        },

        start: function() {
            Backbone.history.start();
        }
    }))();


    return AppRouter;
});