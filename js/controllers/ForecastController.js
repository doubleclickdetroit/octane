define([ 'utils', 'views/ForecastView', 'models/ForecastModel' ],
function(utils, ForecastView, ForecastModel) {

    'use strict';


    var ForecastController;
    ForecastController = (function() {

        var forecastView, forecastModel;

        function init() {

            // create model
            forecastModel = new ForecastModel();

            // create view
            forecastView = new ForecastView({
                model: forecastModel
            });
        }

        /*
         * Private Methods
        */
        function handleForecastEntryPoint() {
            if (forecastModel.validateAttributes()) {
                utils.changePage(forecastView.$el);
            }
            else {
                forecastView.promptEntryConfirmation(function() {
                    utils.changePage(forecastView.$el);
                });
            }
        }

        /*
         * Public Methods
        */
        function navigate(view_id) {
            forecastModel.loadAttributes(view_id, handleForecastEntryPoint);
        }

        function updateAttribute(id, val) {
            forecastModel.updateAttribute(id, val);
        }

        function saveAttributes() {
            var attrs = forecastModel.toJSON();
            forecastModel.saveAttributes(attrs);
        }

        return {
            init            : init,
            navigate        : navigate,
            updateAttribute : updateAttribute,
            saveAttributes  : saveAttributes
        };
    })();


    return ForecastController;
});