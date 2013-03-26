define([],
function () {

    'use strict';


    var channels = {};

    function subscribe(channel, subscription, controller, action, condition) {
        if ( !channels[channel] ) {
            channels[channel] = [];
        }

        if ( !channels[channel][subscription] ) {
            channels[channel][subscription] = [];
        }

        if (typeof controller[action] !== 'function') {
            window.console && window.console.error('Error: The argument for "controller['+action+']" is undefined for call to facade.subscribe('+channel+', '+subscription+').');
            return this;
        }

        if (typeof condition !== 'function') {
            condition = function() { return true; };
        }

        channels[channel][subscription].push({
            action    : action,
            controller: controller,
            condition : condition
        });

        return this;
    }

    function publish(channel, subscription) {
        var args;

        if ( !channels[channel] || !channels[channel][subscription] ) {
            return false;
        }

        args = Array.prototype.slice.call(arguments, 2);

        for (var i = 0, l = channels[channel][subscription].length; i < l; i++) {
            var subscriber = channels[channel][subscription][i],
                callback   = subscriber.controller[subscriber.action],
                condition  = subscriber.condition;

            if (condition.apply(subscriber.controller, args) === true) {
                callback.apply(subscriber.controller, args);
            }
        }

        return this;
    }

    return {
        publish  : publish,
        subscribe: subscribe
    };

});