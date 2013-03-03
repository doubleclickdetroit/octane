define([ './app', './menu', './settings', './alerts', './forecast'],
function(app, menu, settings, alerts, forecast) {

    'use strict';


    // kick-off subscribers
    app.init();
    menu.init();
    settings.init();
    alerts.init();
    forecast.init();
});