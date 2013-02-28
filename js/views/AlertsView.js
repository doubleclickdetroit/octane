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
            _.bindAll(this, 'render', 'pageCreate', 'pageHide');

            // jQM event listeners
            this.$el.on('pagecreate', this.pageCreate);
            this.$el.on('pageinit', this.render);
            this.$el.on('pageshow', this.render);
            this.$el.on('pagehide', this.pageHide);

            // broadcast change
            this.model.on('change:notifications', function() {
                if (this.$el.hasClass('ui-page')) this.render(); // only render after pageinit
                facade.publish('alerts', 'notifications:change', this.model.get('notifications'));
            }, this);
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(this.template(globals.alerts.configuration));
        },

        pageHide: function() {
            this.$('#alertDoneButton').addClass('ui-disabled');
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

            if (isEnabled) {
                this.$('#alertDoneButton').removeClass('ui-disabled');
            }
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target,
                val    = $(target).val();
            facade.publish('alerts', 'updateAttribute', target.id, val);
        },
        handleCancelButtonClick: function() {
            facade.publish('alerts', 'resetAttributes');
        },
        handleDoneButtonClick: function() {
            facade.publish('alerts', 'saveAttributes');
        }

    });


    return AlertsView;
});