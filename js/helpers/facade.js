define([ 'utils', 'helpers/mediator', 'helpers/permissions' ],
function(utils, mediator, permissions) {

    'use strict';

    var facade;
    facade = {};

    facade.subscribe = function(channel, subscription, callback, condition) {
        if (permissions.validate(channel)) {
            mediator.subscribe(channel, subscription, callback, condition);
        }
    };

    facade.subscribeTo = function(channel) {
        return function(subscription, callback, condition) {
            facade.subscribe(channel, subscription, callback, condition);
        };
    }

    facade.publish = function() {
        var args, channel, subscriber;
        channel    = arguments[0],
        subscriber = arguments[1],
        args       = 3 <= arguments.length ? utils.__slice.call(arguments, 2) : [];

        mediator.publish.apply(mediator, [channel, subscriber].concat(utils.__slice.call(args)));
    };

    return facade;
});