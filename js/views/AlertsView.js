define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/alerts/form' ],
function($, _, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var AlertsView;
    AlertsView = Backbone.View.extend({

        template: Mustache.compile(tmpl),

        events: {
            'change :input': 'delegateUpdatedAttribute',
            'click #alertCancelButton': 'handleCancelButtonClick',
            'click #alertDoneButton'  : 'handleDoneButtonClick'
        },

        initialize: function() {
            _.bindAll(this, 'render');

            // model event listeners
            this.model.on('change:notifications', this.render);

            // jQM event listeners
            this.$el.on('pageshow', this.render);

            // create the page
            facade.publish('alerts', 'createPage', this);
        },

        render: function() {
            facade.publish('alerts', 'renderView', this);
        },

        /*
         * Event Handlers
        */
        delegateUpdatedAttribute: function(evt) {
            facade.publish('alerts', 'updateAttribute', this, evt);
        },
        handleCancelButtonClick: function(evt) {
            facade.publish('alerts', 'destroyAttributes', this, function() {
                console.log('callback: destroyed');
            });
        },
        handleDoneButtonClick: function(evt) {
            facade.publish('alerts', 'saveAttributes', this, function() {
                console.log('callback: saved');
            });
        }

    });


    return AlertsView;
});