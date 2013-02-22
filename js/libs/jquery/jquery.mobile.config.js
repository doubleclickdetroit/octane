define( ['jquery'], function($) {

    'use strict';

    function init() {
        // Disable the longer hash-based URLs to PushState
        $.mobile.pushStateEnabled = false;

        // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
        $.mobile.linkBindingEnabled = false;

        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;

        // Cordova cross-domain options
        $.support.cors                 = true;
        $.mobile.allowCrossDomainPages = true;
    }

    $(document).on('mobileinit', init);
});