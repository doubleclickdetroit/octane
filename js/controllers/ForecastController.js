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
                promptNotification();
            }
        }

        function promptNotification() {
            navigator.notification.confirm(
                'Forecasts are only available for Gasoline or Diesel fuel types.',    // message
                function(id) { if (id == 1) { utils.changePage(forecastView.$el); }}, // callback to determine entry
                ' ',                                                                  // title
                'Continue,Cancel'                                                     // button labels
            );
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