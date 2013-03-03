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
            console.log('handleForecastEntryPoint');

            if (forecastModel.acceptableFuelGrade()) {
                utils.changePage(forecastView.$el);
            }
            else {
                forecastView.displayNotification();
            }
        }

        /*
         * Public Methods
        */
        function navigate(view_id) {
            forecastModel.requestForecast(view_id, handleForecastEntryPoint);
        }

        function updateAttribute(id, val) {
            forecastModel.updateAttribute(id, val);
        }

        return {
            init            : init,
            navigate        : navigate,
            updateAttribute : updateAttribute
        };
    })();


    return ForecastController;
});