define([ 'globals', 'utils', 'facade', 'backbone' ],
function(globals, utils, facade, Backbone) {

    'use strict';


    var FuelSitesMapView;
    FuelSitesMapView = Backbone.View.extend({

        el: utils.$('#fuelsitesMap'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // cache $header & $content
            this.$header  = this.$el.find(':jqmData(role=header)');
            this.$content = this.$el.find(':jqmData(role=content)');

            // cache map options
            this.options = {
                'zoom'     : 10,
                'center'   : new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
                'mapTypeId': google.maps.MapTypeId.ROADMAP
            };
        }
    });


    return FuelSitesMapView;
});