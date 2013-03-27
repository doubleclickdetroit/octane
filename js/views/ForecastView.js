define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/forecast/page' ],
function(globals, utils, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var ForecastView;
    ForecastView = Backbone.View.extend({

        el: utils.$('#forecast'),

        template: Mustache.compile(tmpl),

        events: {
            'change :input': 'handleUpdatingAttribute',
            'click button' : 'handleSavingAttributes'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // model events
            this.model.on('change:indicator', this.render, this);

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
            if (json.indicator === 'loading') setTimeout(this.showLoadingIndicator, 0);
            else if (json.indicator !== '')   setTimeout(this.hideLoadingIndicator, 0);

            // set values for controls
            this.$('#forecastIndicator').attr(attr, json.indicator);
            this.$('#forecastLocation').val(json.location);
            this.$('#forecastFuelType').val(json.fuelType).selectmenu().selectmenu('refresh'); // init if not already, then refresh
        },

        /*
         * Public Methods
        */
        promptEntryConfirmation: function(fn) {
            var message  = 'Forecasts are only available for Gasoline or Diesel fuel types.',
                buttons  = 'Continue,Cancel',
                callback = function(id) { if (id === 1) fn(); };

            facade.publish('app', 'confirm', message, callback, buttons);
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target,
                val    = utils.$(target).val();
            facade.publish('forecast', 'updateAttribute', target.id, val);
        },

        handleSavingAttributes: function() {
            facade.publish('forecast', 'saveAttributes');
        }
    });


    return ForecastView;
});