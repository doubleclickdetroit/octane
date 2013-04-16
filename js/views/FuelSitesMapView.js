define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'views/InfoBubbleView', 'views/InfoLabelView', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/criteria' ],
function(globals, utils, facade, Backbone, Mustache, InfoBubbleView, InfoLabelView, tmpl_header, tmpl_criteria) {

    'use strict';


    var FuelSitesMapView;
    FuelSitesMapView = Backbone.View.extend({

        el: utils.$('#fuelsitesMap'),

        events: {
            'click .btn-save': 'displaySaveDialog'
        },

        // cache templates
        tmpl_criteria: Mustache.compile(tmpl_criteria),

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

            // model events
            this.listenTo(this.model, 'change', function() {
                this.options.center = new google.maps.LatLng(
                    this.model.get('latitude'),
                    this.model.get('longitude')
                );
            }, this);

            // jQM events
            this.$el.on('pageshow', this.pageShow);

            // create page
            this.pageCreate();

            // cache $header & content
            this.$criteria = this.$el.find('.searchtext');
            this.$content  = this.$el.find(':jqmData(role=content)');

            // cache map
            this.map = new google.maps.Map(this.$content.get(0), this.options);

            // cache mapMarkers & mapDirections
            this.mapMarkers    = [];
            this.mapDirections = null;

            // cache infoBubbleView
            this.infoBubbleView = new InfoBubbleView({
                'map': this.map
            });
        },

        pageCreate: function () {
            // append the header
            this.$el.find(':jqmData(role=header)').append(Mustache.render(tmpl_header, {
                'excludeSort': true
            }));
        },

        pageShow: function() {
            var height, icon, marker;

            // render $criteria
            this.$criteria.html(this.tmpl_criteria(
                this.model.toJSON()
            ));

            // set $content height
            height = utils.$(window).height() - this.$content.offset().top,
            this.$content.height(height);

            // resize map to cover $content
            google.maps.event.trigger(this.map, 'resize');

            // clear previous map markers
            utils._.each(this.mapMarkers, function(view) {
                if (view.label) {
                    view.label.remove();
                }
                view.marker.setMap(null);
            });

            // clear previous mapMarkers
            this.mapMarkers.length = 0;

            // center the map
            this.map.setCenter(this.options.center);

            // mark current position
            icon = globals.fuelsites.constants.MARKER_PATH + globals.BRANDS.USER_LOCATION;
            marker = new google.maps.Marker({
                'map'     : this.map,
                'position': this.options.center,
                'zIndex'  : -10,
                'icon'    : new google.maps.MarkerImage(icon,null,null,null,new google.maps.Size(26, 26))
            });

            // keep track of marker
            this.mapMarkers.push({'marker':marker});
        },

        render: function(fuelsites) {
            // remove previous polylines
            if (this.mapDirections) this.mapDirections.setMap(null);

            // set map center
            this.map.setZoom(this.options.zoom);
            this.map.setCenter(this.options.center);


            // render fuelsites
            fuelsites.each(function(fuelsite, i) {
                var self, latLng, ppg, icon, marker, label;

                // set context
                self = this;

                // fuelsite location
                latLng = new google.maps.LatLng(
                    fuelsite.get('location').latitude,
                    fuelsite.get('location').longitude
                );

                // ppg
                ppg = '$' + (fuelsite.toJSON().format_ppg() || '0.00');

                // (un)branded logo
                icon = globals.fuelsites.constants.MARKER_PATH                             +
                       (globals.BRANDS[fuelsite.get('brand')] || globals.BRANDS.UNBRANDED) +
                       utils.fileType;

                // place fuelsite marker
                marker = new google.maps.Marker({
                    'map'     : this.map,
                    'position': latLng,
                    'zIndex'  : i+10,
                    'shape'   : globals.fuelsites.configuration.marker.shape,
                    'title'   : ppg,
                    'icon'    : new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(40, 43))
                });

                // overlay labelview
                label = new InfoLabelView({'map': this.map});
                label.render(i, marker, ppg);

                // keep track of marker & label
                this.mapMarkers.push({
                    'label' : label,
                    'marker': marker
                });

                // marker event listener
                google.maps.event.addListener(marker, 'click', function() {
                    self.handleMarkerSelection(marker, fuelsite);
                });
            }, this);


            // display polyline path for single fuelsite
            if (fuelsites.length && fuelsites.length < 2) {
                var directionsService = new google.maps.DirectionsService(),
                    directionsDisplay = new google.maps.DirectionsRenderer({'suppressMarkers': true}),
                    location = fuelsites.first().get('location'),
                    request  = {
                        'travelMode' : google.maps.TravelMode.DRIVING,
                        'destination': new google.maps.LatLng(location.latitude, location.longitude),
                        'origin'     : new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'))
                    };

                // keep track of mapDirections
                this.mapDirections = directionsDisplay;

                // center the map
                directionsDisplay.setMap(this.map);

                // display polyline path for route
                directionsService.route(request, function(result, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    }
                });
            }
        },

        /*
         * Event Handlers
        */
        displaySaveDialog: function (evt) {
            evt.preventDefault();
            facade.publish('favorites', 'prompt');
        },

        handleMarkerSelection: function(marker, fuelsite) {
            this.infoBubbleView.model = fuelsite;
            this.infoBubbleView.render(marker);
        }
    });


    return FuelSitesMapView;
});