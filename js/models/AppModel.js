define([ 'underscore', 'globals', 'backbone' ],
function(_, globals, Backbone) {

    'use strict';


    var AppModel;
    AppModel = Backbone.Model.extend({

        defaults: {
            'available': null,
            'name'     : null,
            'platform' : 'Unknown',
            'version'  : 'Unknown',
            'model'    : null,
            'uuid'     : null,
            'cordova'  : null
        },

        initialize: function() {
            var d = window.device || {};

            // bootstrap device data
            this.set(_.extend(d));
        }

    });


    // Make singleton
    return function() {
        var __instance = null;

        return {
            getInstance: function() {
                if (__instance === null) {
                    __instance = new AppModel();
                }
                return __instance;
            }
        };
    }();
});