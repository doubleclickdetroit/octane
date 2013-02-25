define([ 'facade', 'backbone' ],
function(facade, Backbone) {

    'use strict';


    var AppView = Backbone.View.extend({

        events: {
            'click [data-internal]': 'delegateBeforeNavigate'
        },

        initialize: function() {
            this.render();
        },

        render: function(display) {
            display = display || false;
            return this.$el.toggleClass('ui-hidden', display);
        },

        /*
         * Event Handlers
        */
        delegateBeforeNavigate: function(evt) {
            evt.preventDefault();
            var pathname = $(evt.target).attr('href');
            facade.publish('app', 'beforeNavigate', pathname);
        }

    });

    return AppView;

});