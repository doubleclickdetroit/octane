define([ 'utils', 'facade', 'backbone' ],
function (utils, facade, Backbone) {

    'use strict';


    var AppRouter;
    AppRouter = Backbone.Router.extend({

        /*
         * Route Definitions
        */
        routes: {
            'forecast(/)(:viewId)': 'renderForecast',
            'fuelsites': 'renderFuelSites',
            'settings': 'renderSettings',
            'info': 'renderInfo',
            'alerts': 'renderAlerts',
            'menu': 'renderMenu',

            '': 'root'
        },

        /*
         * Route Handlers
        */
        renderForecast: function (viewId) {
            facade.publish('forecast', 'navigate', viewId);
        },

        renderFuelSites: function () {
            facade.publish('fuelsites', 'navigate');
        },

        renderSettings: function () {
            facade.publish('settings', 'navigate');
        },
        
        renderInfo: function () {
            facade.publish('info', 'navigate');
        },

        renderAlerts: function () {
            facade.publish('alerts', 'navigate');
        },

        renderMenu: function () {
            facade.publish('menu', 'navigate');
        },

        root: function () {
            this.renderMenu();
        },

        start: function () {
            Backbone.history.start();
        }
    });


    return AppRouter;
});
