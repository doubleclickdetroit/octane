define(function() {

    'use strict';


    /*
     * Permissions serve as an intermediate layer to handle which modules
     * can access which parts of the framework offering added security.
     * Meaning a module is only able to do at most what it's permitted it do.
     *
     * Permissions consist of a 'channel' and a 'subscription id'. The validation
     * of a permission is run against the permissions[channel][subscription].
     *
     * Validation will always return true if a channel, or the channel's
     * subscription is undefined. This is by design as it may be tedious to define
     * every channel and subscription. The only time validation will return false
     * is when a channel's subscription is explicitly defined as false (in this file)
     * or or .set(channel, subscription, false).
     * In the latter case, 'helpers/permissions' must be required as a module.
    */

    var permissions = {};

    /*
     * App
    */
    permissions.app = {
        ready: true
    };

    /*
     * Menu
    */
    permissions.menu = {};

    /*
     * Settings
    */
    permissions.settings = {};

    /*
     * Alerts
    */
    permissions.alerts = {};


    return permissions;
});