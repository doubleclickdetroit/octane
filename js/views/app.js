define([ 'facade', 'backbone' ],
function(facade, Backbone) {

    'use strict';


    var AppView = new (Backbone.View.extend({

        events: {
            'click [data-internal]': 'delegateBeforeNavigate'
        },

        delegateBeforeNavigate: function(evt) {
            evt.preventDefault();
            var pathname = $(evt.target).attr('href');
            facade.publish('app', 'beforeNavigate', pathname);
        },

        render: function(display) {
            display = display || false;
            return this.$el.toggleClass('ui-hidden', display);
        }

    }))({ el: document.body });

    return AppView;

});