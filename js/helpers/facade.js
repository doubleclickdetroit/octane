define([ 'utils', 'helpers/mediator', 'helpers/permissions' ],
function(utils, mediator, permissions) {

    'use strict';


    function subscribe(channel, subscription, controller, action, condition) {
        if (controller === undefined) {
            window.console && window.console.error('facade.subscribe is expecting 3rd argument "controller" to be defined.');
        }
        if (action === undefined) {
            window.console && window.console.error('facade.subscribe is expecting 4th argument "action" to be defined.');
        }

        if (permissions.validate(channel, subscription)) {
            mediator.subscribe(channel, subscription, controller, action, condition);
        }
    }

    function subscribeTo(channel, controller) {
        if (channel === undefined) {
            window.console && window.console.error('facade.subscribeTo is expecting 1st argument "channel" to be defined.');
        }
        if (controller === undefined) {
            window.console && window.console.error('facade.subscribeTo is expecting 2nd argument "controller" to be defined.');
        }

        return function(subscription, action, condition) {
            if (action && utils.isFn(controller[action])) {
                subscribe(channel, subscription, controller, action, condition);
            }
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