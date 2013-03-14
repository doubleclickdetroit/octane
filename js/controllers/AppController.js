define([ 'routers/AppRouter', 'views/AppView' ],
function(AppRouter, AppView) {

    'use strict';


    var AppController;
    AppController = (function() {

        var appRouter, appView;

        function AppController() {}

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