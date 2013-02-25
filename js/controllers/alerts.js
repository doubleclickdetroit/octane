define([ 'jquery', 'utils', 'views/alerts', 'models/Alert' ],
function($, utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsModule;
    AlertsModule = (function() {

        function AlertsModule() {
            var alertsView, alertModel;

            // create model
            alertModel = new AlertModel();

            // create view
            alertsView = new AlertsView({
                el   : $('#alerts'),
                model: alertModel
            });
        }

        /*
         * Public Methods
        */
        AlertsModule.prototype.createPage = function(context) {
            var $el, definition;
            $el = context.$el.find(':jqmData(role=content)');
            definition = utils.getPageDefinition('alerts');

            $el.html(context.template(definition));
        };

        AlertsModule.prototype.navigate = function() {
            utils.changePage('#alerts');
        };

        AlertsModule.prototype.renderView = function(context) {
            var data = context.model.toJSON();
            //forecastAlertSlider
            console.log('AlertsModule renderView', data);
        };

        AlertsModule.prototype.updateForecast = function(context, evt) {
            var val = $(evt.target).val();
            context.model.set('notifications', val);
        };

        return AlertsModule;
    })();


    return new AlertsModule();
});