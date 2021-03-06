define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/alerts/page' ],
function(globals, utils, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var AlertsView;
    AlertsView = Backbone.View.extend({

        el: utils.$('#alerts'),

        template: Mustache.compile(tmpl),

        events: {
            'change :input'           : 'handleUpdatingAttribute',
            'click #alertCancelButton': 'handleCancelButtonClick',
            'click #alertDoneButton'  : 'handleDoneButtonClick'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for event listeners
            utils._.bindAll(this, 'render', 'pageHide');

            // jQM event listeners
            this.$el.on('pageinit', this.render);
            this.$el.on('pageshow', this.render);
            this.$el.on('pagehide', this.pageHide);

            // broadcast change
            this.model.on('change:notifications', function() {
                if (this.$el.hasClass('ui-page')) this.render(); // only render after pageinit
                facade.publish('alerts', 'notifications:change', this.model.changed);
            }, this);

            // create page
            this.pageCreate();
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
                val    = utils.$(target).val();
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