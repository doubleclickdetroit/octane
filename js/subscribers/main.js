define([ './app', './menu', './fuelsites', './settings', './info', './alerts', './forecast'],
function (app, menu, fuelsites, settings, info, alerts, forecast) {

    'use strict';


    // kick-off subscribers
    app.init();
    menu.init();
    fuelsites.init();
    settings.init();
    info.init();
    alerts.init();
    forecast.init();
});
