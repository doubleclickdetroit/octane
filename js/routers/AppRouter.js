define([ 'utils', 'facade', 'backbone' ],
function(utils, facade, Backbone) {

    'use strict';


    var AppRouter;
    AppRouter = Backbone.Router.extend({

        /*
         * Route Definitions
        */
        routes: {
            'forecast(/)(:view_id)': 'renderForecast',
            'settings': 'renderSettings',
            'alerts': 'renderAlerts',
            'menu': 'renderMenu',

            '': 'root'
        },

        /*
         * Route Handlers
        */
        renderForecast: function(view_id) {
            facade.publish('forecast', 'navigate', view_id);
        },

        renderSettings: function() {
            facade.publish('settings', 'navigate');
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
    });


    return AppRouter;
});