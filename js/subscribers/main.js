define([ './app', './menu', './settings', './alerts'],
function(app, menu, settings, alerts) {

    'use strict';


    // kick-off subscribers
    app.init();
    menu.init();
    settings.init();
    alerts.init();
});