define([ 'utils', 'helpers/mediator', 'helpers/permissions' ],
function(utils, mediator, permissions) {

    'use strict';


    function subscribe(channel, subscription, callback, condition) {
        if (permissions.validate(channel, subscription)) {
            mediator.subscribe(channel, subscription, callback, condition);
        }
    }

    function subscribeTo(channel) {
        return function(subscription, callback, condition) {
            subscribe(channel, subscription, callback, condition);
        };
    }

    function publish() {
        var args, channel, subscriber;
        channel    = arguments[0],
        subscriber = arguments[1],
        args       = 3 <= arguments.length ? utils.__slice.call(arguments, 2) : [];

        mediator.publish.apply(mediator, [channel, subscriber].concat(utils.__slice.call(args)));
    }


    return {
        publish    : publish,
        subscribe  : subscribe,
        subscribeTo: subscribeTo
    };
});