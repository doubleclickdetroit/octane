define([ 'routers/AppRouter', 'views/AppView', 'models/SearchDetailsModel' ],
function(AppRouter, AppView, SearchDetailsModel) {

    'use strict';


    var AppController;
    AppController = (function() {

        var appRouter, appView, locationModel, searchDetailsModel;

        function AppController() {
            //
            searchDetailsModel = new SearchDetailsModel({
                location: locationModel
            });
        }

        AppController.prototype.init = function() {
            appRouter = new AppRouter();
            appView   = new AppView({
                el: document.body
            });
        };

        AppController.prototype.ready = function() {
            appRouter.start();
            appView.render();
        };

        return AppController;
    })();


    return new AppController();
});