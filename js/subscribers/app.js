define([ 'facade', 'controllers/AppController' ],
function(facade, controller) {

    'use strict';


    var subscribe = facade.subscribeTo('app', controller);

    subscribe('ready',   'ready');
    subscribe('speak',   'textToSpeech');
    subscribe('alert',   'alert');
    subscribe('confirm', 'confirm');
    subscribe('window',  'window');


    return {
        init: function() {
            controller.init();
        }
    };
});