define([ 'globals', 'utils', 'facade', 'backbone' ],
function(globals, utils, facade, Backbone) {

    'use strict';


    var FuelSitesMapView;
    FuelSitesMapView = Backbone.View.extend({

        el: utils.$('#fuelsitesMap'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context
            utils._.bindAll(this, 'render', 'pageShow');

            // cache map options
            this.options = {
                'zoom'     : 10,
                'mapTypeId': google.maps.MapTypeId.ROADMAP
            };

            // jQM events
            this.$el.on('pageshow', this.pageShow);

            // model events
            this.model.on('change', function(criteria) {
                this.options.center = new google.maps.LatLng(
                    this.model.get('latitude'),
                    this.model.get('longitude')
                );
            }, this);

            // cache $header & content
            this.$header  = this.$el.find(':jqmData(role=header)');
            this.$content = this.$el.find(':jqmData(role=content)');

            // cache map
            this.map = new google.maps.Map(this.$content.get(0), this.options);
        },

        pageShow: function() {
            var height = utils.$(window).height() - this.$content.offset().top,
                icon   = globals.fuelsites.constants.MARKER_PATH + globals.BRANDS.USER_LOCATION;

            // set $content height
            this.$content.height(height);

            // resize map to cover $content
            google.maps.event.trigger(this.map, 'resize');

            // center the map
            this.map.setCenter(this.options.center);

            // mark current position
            new google.maps.Marker({
                'map'     : this.map,
                'position': this.options.center,
                'zIndex'  : -10,
                'icon'    : new google.maps.MarkerImage(icon,null,null,null,new google.maps.Size(26, 26))
            });
        },

        render: function(fuelsites) {
            fuelsites.each(function(fuelsite, i) {
                var latLng, icon;
                fuelsite = fuelsite.toJSON();

                // fuelsite location
                latLng = new google.maps.LatLng(
                    fuelsite.location.latitude,
                    fuelsite.location.longitude
                );

                // (un)branded logo
                icon = globals.fuelsites.constants.MARKER_PATH
                     + (globals.BRANDS[fuelsite.brand] || globals.BRANDS.UNBRANDED)
                     + utils.fileType;

                // place fuelsite marker
                new google.maps.Marker({
                    'map'     : this.map,
                    'position': latLng,
                    'zIndex'  : i+10,
                    'shape'   : globals.fuelsites.configuration.marker.shape,
                    'title'   : '$' + (fuelsite.format_ppg() || '0.00'),
                    'icon'    : new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(40, 43))
                });
            }, this);
        }
    });


    return FuelSitesMapView;
});