define([ 'jquery', 'underscore', 'backbone', './globals' ],
function($, _, Backbone, globals) {

    'use strict';


    var utils = {};

    /*
     * jQuery convenience method
    */
    utils.$ = $;

    /*
     * Underscore convenience method
    */
    utils._ = _;

    /*
     * Backbone convenience method
    */
    utils.Backbone = Backbone;

    /*
     * Array Slice convenience method
    */
    utils.__slice = [].slice;

    /*
     * Object Has Property convenience method
    */
    utils.__hasProp = {}.hasOwnProperty;

    /*
     * Extend Classes
    */
    utils.extend = function(child, parent) {
        for (var key in parent) {
            if ( this.__hasProp.call(parent, key) ) {
                child[key] = parent[key];
            }
        }

        function Ctor() {
            this.constructor = child;
        }
        Ctor.prototype = parent.prototype;

        child.prototype = new Ctor();
        child.__super__ = parent.prototype;

        return child;
    };

    /*
     * Backbone.history() convenience method
    */
    utils.navigate = function(viewId) {
        Backbone.history.navigate(viewId, true);
    };

    /*
     * Convenience method for accessing $mobile.changePage(), included in case any other actions are required in the same step.
     *
     * @param - changeTo  : (String) Absolute or relative URL. In this app references to '#index', '#search' etc.
     * @param - effect    : (String) One of the supported jQuery mobile transition effects
     * @param - direction : (Boolean) Decides the direction the transition will run when showing the page
     * @param - updateHash: (Boolean) Decides if the hash in the location bar should be updated
    */
    utils.changePage = function(viewID, effect, direction, updateHash) {
        if (effect === undefined || effect === null) {
            effect = globals.DEFAULT.PAGE_TRANSITION;
        }
        if (direction === undefined || direction === null) {
            direction = false;
        }
        if (updateHash === undefined) {
            updateHash = false;
        }

        $(function() {

            $.mobile.changePage(viewID, {
                transition: effect,
                reverse   : direction,
                changeHash: updateHash
            });
        });
    };

    /*
     * Function to check the checkConnection
     *
     * @param  - none
     * @return - connectivity type()
    */
    utils.checkConnection = function() {
        var connectivity = globals.CONNECTIVITY;

        return _.find(connectivity, function(value, key) {
            return Connection[key] === navigator.connection.type;
        }) || connectivity['NONE'];
    };
    
    /*
     * Function to validate Email Address format
     *
     * @param (String) emailAddress The Email Address to validate for formatting
     * @return (Boolean) True or False as to whether the Email Address is valid
     */
    utils.isEmailAddressValid = function (emailAddress) {
    	var pattern = new RegExp(globals.APP.EMAIL_ADDRESS_VALIDATION_PATTERN);
    	return pattern.test(emailAddress);
    };

    return utils;
});