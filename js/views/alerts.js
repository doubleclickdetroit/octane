define([ 'jquery', 'underscore', 'facade', 'backbone', 'handlebars', 'text!tmpl/alertsForm' ],
function($, _, facade, Backbone, Handlebars, tmpl) {

    'use strict';


    var AlertsView;
    AlertsView = Backbone.View.extend({

        template: Handlebars.compile(tmpl),

        events: {
            'change #forecastAlertSlider': 'handleAlertChange',
            'click #alertCancelButton': 'handleCancelButtonClick',
            'click #alertDoneButton': 'handleDoneButtonClick'
        },

        initialize: function() {
            _.bindAll(this, 'pageInit', 'pageCreate', 'pageShow', 'pageHide', 'render');

            // model event listeners
            this.model.on('change', this.render);

            // jQM event listeners
            this.$el.on('pageinit', this.pageInit);
            this.$el.on('pageshow', this.pageShow);
            this.$el.on('pagehide', this.pageHide);
            this.$el.on('pagebeforecreate', this.pageCreate);
        },

        render: function() {
            facade.publish('alerts', 'renderView', this);
        },

        /*
         * jQM Events
        */
        pageCreate: function() {
            facade.publish('alerts', 'createPage', this);
        },

        pageInit: function() {
            // console.log('AlertsView pageInit', this);
        },

        pageShow: function() {
            // console.log('AlertsView pageShow', this);
        },

        pageHide: function() {
            // console.log('AlertsView pageHide', this);
        },

        /*
         * Event Handlers
        */
        handleAlertChange: function(evt) {
            facade.publish('alerts', 'updateForecast', this, evt);
        },
        handleCancelButtonClick: function() {},
        handleDoneButtonClick: function() {}

    });


    return AlertsView;
});