define([ 'routers/app', 'views/app' ],
function(appRouter, appView) {

    'use strict';


    var appModule;
    appModule = (function() {

        function ready() {
            appRouter.start();
            appView.render();
        }

        return {
            ready: ready
        };
    })();


    return appModule;
});