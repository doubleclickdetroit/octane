'use strict';


require.config({
    paths: {
        // RequireJS Plugins
        'cs'  : 'libs/require/cs',
        'text': 'libs/require/text',

        // Frameworks
        'cordova': 'libs/cordova-2.4.0',
        'backbone'  : 'libs/backbone/backbone',
        'underscore': 'libs/underscore/underscore',
        'handlebars': 'libs/handlebars/handlebars',
        'jquery'       : 'libs/jquery/jquery',
        'jquery-mobile': 'libs/jquery/jquery.mobile',

        // Helpers
        'utils' : 'helpers/utils',
        'facade': 'helpers/facade'
    },

    shim: {
        'underscore' : {
            'exports': '_'
        },
        'backbone': {
            'deps'   : [ 'underscore', 'jquery', 'handlebars' ],
            'exports': 'Backbone'
        },
        'jquery-mobile': [ 'jquery', 'libs/jquery/jquery.mobile.config' ]
    }
});


require([ 'facade', 'modules/main', 'jquery-mobile', 'cordova' ],
function(facade) {

    function onAppReady() {
        facade.publish('app', 'init');
    }

    if (document.location.protocol === 'file:') {
        document.addEventListener('deviceready', onAppReady, false);
    }
    else {
        onAppReady();
    }
});