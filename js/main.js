'use strict';


require.config({
    paths: {
        // RequireJS Plugins
        'cs'   : 'libs/require/cs',
        'text' : 'libs/require/text',
        'async': 'libs/require/async',

        // Frameworks
        'cordova': 'libs/cordova-2.4.0',
        'mustache': 'libs/mustache/mustache',
        'backbone'  : 'libs/backbone/backbone',
        'underscore': 'libs/underscore/underscore',
        'jquery'       : 'libs/jquery/jquery',
        'jquery-mobile': 'libs/jquery/jquery.mobile',

        // Helpers
        'utils' : 'helpers/utils',
        'facade': 'helpers/facade',

        // Directories
        'tmpl': 'templates',

        // jQuery Plugins
        'plugin-timeago': 'libs/jquery/jquery.timeago',
        'plugin-dialog' : 'libs/jquery/jquery.mobile.simpledialog2',

        // Additional Plugins
        'plugin-infobubble': 'libs/infobubble/infobubble'
    },

    shim: {
        'underscore' : {
            'exports': '_'
        },
        'backbone': {
            'deps'   : [ 'underscore', 'jquery', 'mustache' ],
            'exports': 'Backbone'
        },
        'plugin-infobubble': {
            'exports': 'InfoBubble'
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