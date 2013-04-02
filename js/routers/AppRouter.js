define([ 'utils', 'facade', 'backbone' ],
function(utils, facade, Backbone) {

    'use strict';


    var AppRouter;
    AppRouter = Backbone.Router.extend({

        /*
         * Route Definitions
        */
        routes: {
            'fuelsites(/)(:viewId)': 'renderFuelSites',
            'forecast(/)(:viewId)' : 'renderForecast',
            'favorites'            : 'renderFavorites',
            'settings'             : 'renderSettings',
            'info'                 : 'renderInfo',
            'feedback'             : 'renderFeedback',
            'alerts'               : 'renderAlerts',
            'search'               : 'renderSearch',
            'menu'                 : 'renderMenu',
            'termsAndConditions'   : 'renderTermsAndConditions',

            '': 'root'
        },

        /*
         * Route Handlers
        */
        renderFuelSites: function(viewId) {
            facade.publish('fuelsites', 'navigate', viewId);
        },

        renderForecast: function(viewId) {
            facade.publish('forecast', 'navigate', viewId);
        },

        renderFavorites: function() {
            facade.publish('favorites', 'navigate');
        },

        renderSettings: function() {
            facade.publish('settings', 'navigate');
        },

        renderInfo: function() {
            facade.publish('info', 'navigate');
        },

        renderFeedback: function() {
            facade.publish('feedback', 'navigate');
        },

        renderAlerts: function() {
            facade.publish('alerts', 'navigate');
        },

        renderSearch: function() {
            facade.publish('search', 'navigate');
        },

        renderMenu: function() {
            facade.publish('menu', 'navigate');
        },

        renderTermsAndConditions: function() {
            facade.publish('termsAndConditions', 'navigate');
        },

        root: function() {
            this.renderFuelSites();
        },

        start: function() {
            Backbone.history.start();
            this.root(); // default to root route
        }
    });


    return AppRouter;
});
