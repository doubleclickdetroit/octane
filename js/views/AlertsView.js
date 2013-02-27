define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/alerts/form' ],
function($, _, globals, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var AlertsView;
    AlertsView = Backbone.View.extend({

        el: $('#alerts'),

        template: Mustache.compile(tmpl),

        events: {
            'change :input'           : 'handleUpdatingAttribute',
            'click #alertCancelButton': 'handleCancelButtonClick',
            'click #alertDoneButton'  : 'handleDoneButtonClick'
        },

        initialize: function() {
            _.bindAll(this, 'render');

            // model event listeners
            this.model.on('change:notifications', this.render);
            this.model.on('destroy', function() { console.log('*** model destroyed'); });

            // jQM event listeners
            this.$el.on('pageshow', this.render);

            // create the page
            this.createPage();
        },

        createPage: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(this.template(globals.alerts.configuration));
        },

        render: function() {
            var data, isEnabled, uiState;

            data      = this.model.toJSON();
            isEnabled = data.notifications === globals.alerts.constants.ALERT_ENABLED;
            uiState   = isEnabled ? 'enable' : 'disable';

            this.$('#forecastAlertSlider')
                .val(data.notifications)
                .slider('refresh');

            this.$('#alertLocation')
                .val(data.location)
                .textinput(uiState);

            this.$('#alertFuelType')
                .val(data.fuelType)
                .selectmenu(uiState).selectmenu('refresh');

            this.$('#alertForecastChange')
                .val(data.forecastChange)
                .selectmenu(uiState).selectmenu('refresh');

            this.$('#alertDoneButton')
                .toggleClass('ui-disabled', !isEnabled);
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target,
                val    = $(target).val();
            facade.publish('alerts', 'updateAttribute', this, target.id, val);
        },
        handleCancelButtonClick: function(evt) {
            facade.publish('alerts', 'resetAttributes', this);
        },
        handleDoneButtonClick: function(evt) {
            facade.publish('alerts', 'saveAttributes', this);
        }

    });


    return AlertsView;
});