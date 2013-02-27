define([ 'utils', 'views/AlertsView', 'models/AlertsModel' ],
function(utils, AlertsView, AlertModel) {

    'use strict';


    var AlertsController;
    AlertsController = (function() {

        function init() {
            var alertsView, alertModel;

            // create model
            alertModel = new AlertModel();

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
            context.model.save(context.model.toJSON());
        }

        function resetAttributes(context) {
            context.model.resetAttributes();
        }

        function destroyAttributes(context) {
            function reloadAttributes() {
                context.model.reloadAttributes.call(context.model);
            }
            context.model.destroy({callback: reloadAttributes});
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