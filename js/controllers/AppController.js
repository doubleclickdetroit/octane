define([ 'routers/AppRouter', 'views/AppView' ],
function(AppRouter, AppView) {

    'use strict';


    var AppController;
    AppController = (function() {

        var appRouter, appView;

        function init() {
            appRouter = new AppRouter();

            appView = new AppView({
                el: document.body
            });
        }

        function ready() {
            appRouter.start();
            appView.render();
        }

        return {
            init : init,
            ready: ready
        };
    })();


    return AppController;
});