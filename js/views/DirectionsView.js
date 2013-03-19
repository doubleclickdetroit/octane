define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache' ],
function($, _, globals, facade, Backbone, Mustache) {

    'use strict';

    var DirectionsView;
    DirectionsView = Backbone.View.extend({

        el: $('#directions'),

        initialize: function() {
            console.log('DirectionsView initialize', google.maps);
        },

        render: function(fuelSiteModel) {
            console.log('DirectionsView render', fuelSiteModel);
        }
    });


    return DirectionsView;
});