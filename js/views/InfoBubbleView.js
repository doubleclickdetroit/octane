define([ 'globals', 'utils', 'facade', 'backbone' ],
function(globals, utils, facade, Backbone) {

    'use strict';


    var InfoBubbleView;
    InfoBubbleView = Backbone.View.extend({

        initialize: function() {
            console.log('InfoBubbleView initialize');
        },

        render: function(marker, fuelsite) {
            console.log('InfoBubbleView render', marker, fuelsite);
        }
    });


    return InfoBubbleView;
});