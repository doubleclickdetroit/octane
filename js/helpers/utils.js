define([ 'jquery', 'backbone', './globals' ],
function($, Backbone, globals) {

    'use strict';


    var utils = {};

    /*
     * jQuery convenience method
    */
    utils.$ = $;

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
    },

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


    return utils;
});