define([ 'facade', 'routers/app', 'views/app' ],
function(facade, appRouter, appView) {

    'use strict';


    facade.subscribe('app', 'init', function() {
        appView.render();
        appRouter.start();
    });
});