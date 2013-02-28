define([ 'utils', 'views/AlertsView', 'models/AlertsModel' ],
function(utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsController;
    AlertsController = (function() {

        var alertsView, alertModel;

        function init() {

            // create model
            alertModel = new AlertModel();

            // create view
            alertsView = new AlertsView({
                model: alertModel
            });
        }

        function navigate() {
            utils.changePage(alertsView.$el);
        }

        function updateAttribute(id, val) {
            alertModel.updateAttribute(id, val);
        }

        function saveAttributes() {
            alertModel.saveAttributes();
        }

        function resetAttributes() {
            alertModel.resetAttributes();
        }

        return {
            init           : init,
            navigate       : navigate,
            updateAttribute: updateAttribute,
            saveAttributes : saveAttributes,
            resetAttributes: resetAttributes
        };
    })();


    return AlertsController;
});