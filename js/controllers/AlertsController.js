define([ 'utils', 'views/AlertsView', 'models/AlertsModel' ],
function(utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsController;
    AlertsController = (function() {

        function init() {
            var alertsView, alertModel;

            // create model
            window.alertModel = alertModel = new AlertModel();

            // create view
            alertsView = new AlertsView({
                model: alertModel
            });
        }

        function navigate() {
            utils.changePage('#alerts');
        }

        function updateAttribute(context, id, val) {
            context.model.updateAttribute(id, val);
        }

        function saveAttributes(context) {
            context.model.saveAttributes();
        }

        function resetAttributes(context) {
            context.model.resetAttributes();
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