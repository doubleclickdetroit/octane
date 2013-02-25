define([ 'utils', 'facade', 'backbone' ],
function(utils, facade, Backbone) {

    'use strict';


    var AppRouter;
    AppRouter = new (Backbone.Router.extend({

        routes: {
            'settings(/)(:id)': 'renderSettings',
            'alerts'          : 'renderAlerts',
            'menu'            : 'renderMenu',
            ''                : 'root'
        },

        renderSettings: function(id) {
            facade.publish('settings', 'navigate', id || null);
        },

        renderAlerts: function() {
            facade.publish('alerts', 'navigate');
        },

        renderMenu: function() {
            facade.publish('menu', 'navigate');
        },

        root: function() {
            this.renderMenu();
        },

        start: function() {
            Backbone.history.start();
        }
    }))();


    return AppRouter;
});