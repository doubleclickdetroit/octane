define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/forecast/page' ],
function($, _, globals, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var ForecastView;
    ForecastView = Backbone.View.extend({

        el: $('#forecast'),

        template: Mustache.compile(tmpl),

        events: {
            'change :input': 'handleUpdatingAttribute',
            'click button' : 'handleCriteriaSubmission'
        },

        initialize: function() {
            _.bindAll(this, 'render');

            // model events
            this.model.on('change:indicator', this.render);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(this.template(globals.forecast.configuration));
        },

        render: function(data, id) {
            var ATTR, json;
            ATTR = globals.forecast.constants.DATA_INDICATOR_KEY;
            json = data.toJSON();
            console.log('ForecastView render', json);
            this.$('#forecastIndicator').attr(ATTR, id);
            this.$('#forecastLocation').val(json.location);
            this.$('#forecastFuelType').val(json.fuelType).selectmenu('refresh');
        },

        displayNotification: function() {
            navigator.notification.confirm(
                'Forecasts are only available for Gasoline or Diesel fuel types.',               // message
                function(id) { if (id == 1) { console.log('ForecastView displayNotification', id) }}, // callback to determine entry
                ' ',                                                                             // title
                'Continue,Cancel'                                                                // button labels
            );
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target,
                val    = $(target).val();
            facade.publish('forecast', 'updateAttribute', target.id, val);
        },
        handleCriteriaSubmission: function() {
            console.log('ForecastView handleCriteriaSubmission');
        }
    });


    return ForecastView;
});