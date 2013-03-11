define([ 'jquery', 'underscore', 'backbone', 'facade' ],
function($, _, Backbone, facade) {

    'use strict';


    var AppView = Backbone.View.extend({

        events: {
            'click [data-internal]': 'delegateBeforeNavigate'
        },

        initialize: function(options) {
            this.render();
            this.setupBackboneFetchEventListener();
        },

        render: function(display) {
            display = display || false;
            return this.$el.toggleClass('ui-hidden', display);
        },

        setupBackboneFetchEventListener: function() {
            _.each(['Model', 'Collection'], function(key) {
                var ctor, fetch;

                // cache Backbone constructor
                ctor = Backbone[key];

                // cache original fetch
                fetch = ctor.prototype.fetch;

                // override the fetch method to broadcast fetch event
                ctor.prototype.fetch = function() {

                    // trigger the fetch event on the instance
                    this.trigger('fetch');

                    // pass through to original fetch
                    return fetch.apply(this, arguments);
                };
            });
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