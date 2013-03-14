define([ './app', './location', './searchDetails', './menu', './fuelsites', './settings', './info', './alerts', './forecast'],
function (app, location, searchDetails, menu, fuelsites, settings, info, alerts, forecast) {

    'use strict';


    // app
    app.init();
    location.init();
    searchDetails.init();

    // views
    menu.init();
    fuelsites.init();
    settings.init();
    info.init();
    alerts.init();
    forecast.init();
});
