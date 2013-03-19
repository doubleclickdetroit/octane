define([ 'routers/AppRouter', 'views/AppView', 'models/AppModel', 'globals' ],
function(AppRouter, AppView, AppModel, globals) {

    'use strict';


    var AppController;
    AppController = (function () {

        var appRouter, appView, appModel;

        function AppController() {}
        
        AppController.prototype.init = function () {
            appRouter = new AppRouter();
            appModel  = AppModel.getInstance();
            appView   = new AppView({
            	model: appModel,
                el: document.body
            });
            
            // if the app has been opened a multiple of 10 times
            // and the user hasn't already rated the app or elected to never rate the app
            if (appModel.get('appOpenCount') % 10 == 0 
            		&& (0 > $.inArray(appModel.get('isAppRated'), [globals.RATE_IT.NO_THANKS, appModel.get('buildVersion')]))) {
                appView.promptToRateIt();
            }

        };

        AppController.prototype.ready = function () {
            appRouter.start();
            appView.render();
        };

        AppController.prototype.alert = function () {
            appView.displayAlert.apply(null, arguments);
        };

        AppController.prototype.confirm = function () {
            appView.displayConfirm.apply(null, arguments);
        };

        return AppController;
    })();


    return new AppController();
});