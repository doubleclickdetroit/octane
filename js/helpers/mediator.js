define(function () {

    'use strict';


    var channels;
    channels = {};

    function subscribe(channel, subscription, callback, condition) {
        if ( !channels[channel] ) {
            channels[channel] = [];
        }

        if ( !channels[channel][subscription] ) {
            channels[channel][subscription] = [];
        }

        if (typeof condition !== 'function') {
            condition = function() { return true; };
        }

        channels[channel][subscription].push({
            context  : this,
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
                condition    = subscriber.condition;

            if (condition.apply( subscriber.context, args ) === true) {
                subscriber.callback.apply(subscriber.context, args);
            }
        }

        return this;
    }

    return {
        publish  : publish,
        subscribe: subscribe
    };

});