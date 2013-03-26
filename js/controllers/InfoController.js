define([ 'utils', 'views/InfoView', 'models/InfoModel', 'models/AppModel' ],
function (utils, InfoView, InfoModel, AppModel) {

    'use strict';


    var InfoController;
    InfoController = (function () {

        var infoView, infoModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function InfoController() {}
        InfoController.prototype.init = function () {
            // create model
            infoModel = new InfoModel(null, {
                device: AppModel.getInstance().toJSON()
            });

            // create view
            infoView = new InfoView({
                model: infoModel
            });
        };

        /*
         * Public Methods
        */
        InfoController.prototype.navigate = function () {
            utils.changePage(infoView.$el);
        };

        return InfoController;
    })();


    return new InfoController();
});