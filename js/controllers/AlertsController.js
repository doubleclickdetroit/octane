define([ 'utils', 'views/AlertsView', 'models/AlertsModel' ],
function(utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsController;
    AlertsController = (function() {

        var alertsView, alertModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function AlertsController() {}
        AlertsController.prototype.init = function() {
            // create model
            alertModel = new AlertModel();

            // create view
            alertsView = new AlertsView({
                model: alertModel
            });
        }

        AlertsController.prototype.navigate = function() {
            utils.changePage(alertsView.$el);
        }

        AlertsController.prototype.updateAttribute = function(id, val) {
            alertModel.updateAttribute(id, val);
        }

        AlertsController.prototype.saveAttributes = function() {
            alertModel.saveAttributes();
        }

        AlertsController.prototype.resetAttributes = function() {
            alertModel.resetAttributes();
        }

        return AlertsController;
    })();


    return new AlertsController();
});