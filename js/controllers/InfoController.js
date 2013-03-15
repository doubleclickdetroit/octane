define([ 'utils', 'views/InfoView', 'models/InfoModel', 'models/AppModel' ],
function (utils, InfoView, InfoModel, AppModel) {

    'use strict';


    var InfoController;
    InfoController = (function () {

        var infoView, infoModel;

        function init() {
            // create model
            infoModel = new InfoModel({
                device: AppModel.getInstance().toJSON()
            });

            // create view
            infoView = new InfoView({
                model: infoModel
            });
        }

        function navigate() {
            utils.changePage(infoView.$el);
        }

        return {
            init    : init,
            navigate: navigate
        };
    })();


    return InfoController;
});