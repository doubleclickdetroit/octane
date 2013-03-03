'use strict';


require.config({
    paths: {
        // RequireJS Plugins
        'cs'  : 'libs/require/cs',
        'text': 'libs/require/text',

        // Frameworks
        'cordova': 'libs/cordova-2.4.0',
        'mustache': 'libs/mustache/mustache',
        'backbone'  : 'libs/backbone/backbone',
        'underscore': 'libs/underscore/underscore',
        'jquery'       : 'libs/jquery/jquery',
        'jquery-mobile': 'libs/jquery/jquery.mobile',

        // Helpers
        'utils'  : 'helpers/utils',
        'facade' : 'helpers/facade',

        // Direcotries
        'tmpl': 'templates/',
    },

    shim: {
        'underscore' : {
            'exports': '_'
        },
        'backbone': {
            'deps'   : [ 'underscore', 'jquery', 'mustache' ],
            'exports': 'Backbone'
        },
        'jquery-mobile': [ 'jquery', 'libs/jquery/jquery.mobile.config' ]
    }
});


require([ 'facade', 'subscribers/main', 'jquery-mobile', 'cordova' ],
function(facade) {

    function onAppReady() {
        facade.publish('app', 'ready');
    }

    if (document.location.protocol === 'file:') {
        document.addEventListener('deviceready', onAppReady, false);
    }
    else {
        onAppReady();
    }
});