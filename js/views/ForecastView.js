define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/forecast/page' ],
function($, _, globals, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var ForecastView;
    ForecastView = Backbone.View.extend({

        el: $('#forecast'),

        template: Mustache.compile(tmpl),

        events: {
            'change :input': 'handleUpdatingAttribute',
            'click button' : 'handleSavingAttributes'
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

        render: function(data) {
            var attr, json;
            attr = globals.forecast.constants.DATA_INDICATOR_KEY;
            json = data.toJSON();

            // toggle loading message
            if (json.indicator === 'loading') setTimeout($.mobile.showPageLoadingMsg, 0);
            else if (json.indicator !== '')   setTimeout($.mobile.hidePageLoadingMsg, 0);

            // set values for controls
            this.$('#forecastIndicator').attr(attr, json.indicator);
            this.$('#forecastLocation').val(json.location);
            this.$('#forecastFuelType').val(json.fuelType).selectmenu().selectmenu('refresh'); // init if not already, then refresh
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target,
                val = $(target).val();
            facade.publish('forecast', 'updateAttribute', target.id, val);
        },
        handleSavingAttributes: function() {
            facade.publish('forecast', 'saveAttributes');
        }
    });


    return ForecastView;
});