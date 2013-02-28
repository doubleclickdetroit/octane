define([ 'permissions' ],
function(permissions) {

    'use strict';


    function doesExist(channel) {
        return permissions[channel] !== undefined;
    }

    function set(channel, subscription, bool) {
        if (doesExist(channel)) {
            bool = (bool !== undefined) ? bool : true;
            permissions[channel][subscription] = bool;
        }
    }

    function validate(channel, subscription) {
        if (doesExist(channel)) {
            var permission = permissions[channel][subscription];
            return permission === undefined ? true : permission;
        }
        return true;
    }


    return {
        set     : set,
        validate: validate
    };
});