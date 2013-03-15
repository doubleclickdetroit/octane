define([ 'underscore', 'globals', 'backbone' ],
function(_, globals, Backbone) {

    'use strict';


    var AppModel;
    AppModel = Backbone.Model.extend({

        defaults: {
            'available': null,
            'osversion': 'Unknown',
            'name'     : null,
            'platform' : 'Unknown',
            'version'  : 'Unknown',
            'model'    : null,
            'uuid'     : null,
            'cordova'  : null
        },

        initialize: function() {
            var d = window.device || {},
                v = d.version,
                p = d.platform;

            // bootstrap device data
            this.set(_.extend(d, {
                'osversion': p && v ? p+' '+v : 'Unknown' // if 'Unknown', will not trigger 'change:osversion' event since it's already set to the value 'Unknown' :)
            }));
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