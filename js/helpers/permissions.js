define(function() {

    'use strict';


    var permissions = {};

    function doesExist(channel) {
        return typeof permissions[channel] !== 'undefined';
    }

    function set(channel, subscription, val) {
        if (doesExist(channel, subscription)) {
            permissions[channel][subscription] = val;
        }
    }

    function validate(channel, subscription) {
        if (doesExist(channel, subscription)) {
            return permissions[channel][subscription];
        }
        return true;
    }

    return {
        set     : set,
        validate: validate
    };
});