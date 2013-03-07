define([ './app', './menu', './fuelsites', './settings', './alerts', './forecast'],
function(app, menu, fuelsites, settings, alerts, forecast) {

    'use strict';


    // kick-off subscribers
    app.init();
    menu.init();
    fuelsites.init();
    settings.init();
    alerts.init();
    forecast.init();
});