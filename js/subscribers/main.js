define([],
function(require) {

    'use strict';


    // app
    require('./app').init();
    require('./searchDetails').init();

    // views
    require('./menu').init();
    require('./fuelsites').init();
    require('./settings').init();
    require('./feedback').init();
    require('./info').init();
    require('./search').init();
    require('./favorites').init();
    require('./alerts').init();
    require('./forecast').init();
    require('./termsAndConditions').init();
});
