define([ 'utils', 'backbone', 'views/ForecastView', 'models/ForecastModel', 'models/SearchDetailsModel' ],
function(utils, Backbone, ForecastView, ForecastModel, SearchDetailsModel) {

    'use strict';


    var ForecastController;
    ForecastController = (function() {

        var searchCriteriaModel, forecastView, forecastModel;

        /*
         * Private
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

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function ForecastController() {}
        ForecastController.prototype.init = function() {
            // create models
            searchCriteriaModel = SearchDetailsModel.getInstance();

            forecastModel = new ForecastModel({
                criteriaModel: searchCriteriaModel
            });

            // create view
            forecastView = new ForecastView({
                model: forecastModel
            });
        };


        /*
         * Public Methods
        */
        ForecastController.prototype.navigate = function(view_id) {
            forecastModel.loadAttributes(view_id, handleForecastEntryPoint);
        };

        ForecastController.prototype.updateAttribute = function(id, val) {
            forecastModel.updateAttribute(id, val);
        };

        ForecastController.prototype.saveAttributes = function(first_argument) {
            var attrs = forecastModel.toJSON();
            forecastModel.saveAttributes(attrs);
        };

        return ForecastController;
    })();


    return new ForecastController();
});