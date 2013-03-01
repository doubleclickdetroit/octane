define(function () {

    'use strict';


    var channels = {};

    function subscribe(channel, subscription, callback, condition) {
        if ( !channels[channel] ) {
            channels[channel] = [];
        }

        if ( !channels[channel][subscription] ) {
            channels[channel][subscription] = [];
        }

        if (typeof callback !== 'function') {
            window.console && window.console.error('Error: The argument "callback" is undefined for call to facade.subscribe('+channel+', '+subscription+').');
            return this;
        }

        if (typeof condition !== 'function') {
            condition = function() { return true; };
        }

        channels[channel][subscription].push({
            callback : callback,
            condition: condition
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
                condition  = subscriber.condition;

            if (condition.apply(null, args) === true) {
                subscriber.callback.apply(null, args);
            }
        }

        return this;
    }

    return {
        publish  : publish,
        subscribe: subscribe
    };

});