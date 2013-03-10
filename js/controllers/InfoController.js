define([ 'utils', 'views/InfoView', 'models/InfoModel' ],
function (utils, InfoView, InfoModel) {

    'use strict';


    var InfoController;
    InfoController = (function () {

        var infoView, infoModel;
        
        function init() {

            // create model
            infoModel = new InfoModel();

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