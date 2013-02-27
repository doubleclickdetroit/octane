define([ 'jquery', 'globals', 'utils', 'views/AlertsView', 'models/AlertsModel' ],
function($, globals, utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsController;
    AlertsController = (function() {

        var __definition = globals.alerts;


        function init() {
            var alertsView, alertModel;

            // create model
            alertModel = new AlertModel();

            // create view
            alertsView = new AlertsView({
                el   : $('#alerts'),
                model: alertModel
            });
        }

        function createPage(context) {
            var $el, config;

            config = __definition.configuration;
            $el = context.$el.find(':jqmData(role=content)');

            $el.html(context.template(config));
        }

        function navigate() {
            utils.changePage('#alerts');
        }

        function renderView(context) {
            var data, isEnabled, uiState;

            data      = context.model.toJSON();
            isEnabled = data.notifications === __definition.constants.ALERT_ENABLED;
            uiState   = isEnabled ? 'enable' : 'disable';

            context.$('#forecastAlertSlider')
                .val(data.notifications)
                .slider('refresh');

            context.$('#alertLocation')
                .val(data.location)
                .textinput(uiState);

            context.$('#alertFuelType')
                .val(data.fuelType)
                .selectmenu(uiState).selectmenu('refresh');

            context.$('#alertForecastChange')
                .val(data.forecastChange)
                .selectmenu(uiState).selectmenu('refresh');

            context.$('#alertDoneButton')
                .toggleClass('ui-disabled', !isEnabled);
        }

        function updateAttribute(context, evt) {
            var target = evt.target,
                val    = $(target).val();
            context.model.updateAttribute(target.id, val);
        }

        function saveAttributes(context, callback) {
            context.model.save(context.model.toJSON(), {callback:callback});
        }

        function destroyAttributes(context, callback) {
            context.model.destroy({success:callback});
        }

        return {
            init             : init,
            createPage       : createPage,
            navigate         : navigate,
            renderView       : renderView,
            saveAttributes   : saveAttributes,
            updateAttribute  : updateAttribute,
            destroyAttributes: destroyAttributes
        };
    })();


    return AlertsController;
});