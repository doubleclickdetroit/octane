define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/alerts/form' ],
function($, _, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var AlertsView;
    AlertsView = Backbone.View.extend({

        template: Mustache.compile(tmpl),

        events: {
            'change #forecastAlertSlider': 'handleForecastChange',
            'click #alertCancelButton': 'handleCancelButtonClick',
            'click #alertDoneButton': 'handleDoneButtonClick'
        },

        initialize: function() {
            _.bindAll(this, 'render');

            // model event listeners
            this.model.on('change', this.render);

            // jQM event listeners
            this.$el.on('pageshow', this.render);

            // create the page
            facade.publish('alerts', 'createPage', this);
        },

        render: function() {
            console.log('render', this);
            facade.publish('alerts', 'renderView', this);
        },

        /*
         * Event Handlers
        */
        handleForecastChange: function(evt) {
            facade.publish('alerts', 'updateForecast', this, evt);
        },
        handleCancelButtonClick: function() {
            //
        },
        handleDoneButtonClick: function(evt) {
            evt.preventDefault();
            console.log('handleDoneButtonClick', this, evt);
        }

    });


    return AlertsView;
});