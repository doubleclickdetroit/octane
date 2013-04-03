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
            var height, icon;

            // render $criteria
            this.$criteria.html(this.tmpl_criteria(
                this.model.toJSON()
            ));

            // set $content height
            height = utils.$(window).height() - this.$content.offset().top,
            this.$content.height(height);

            // resize map to cover $content
            google.maps.event.trigger(this.map, 'resize');

            // center the map
            this.map.setCenter(this.options.center);

            // mark current position
            icon = globals.fuelsites.constants.MARKER_PATH + globals.BRANDS.USER_LOCATION;
            new google.maps.Marker({
                'map'     : this.map,
                'position': this.options.center,
                'zIndex'  : -10,
                'icon'    : new google.maps.MarkerImage(icon,null,null,null,new google.maps.Size(26, 26))
            });
        },

        render: function(fuelsites) {
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

                // marker event listener
                google.maps.event.addListener(marker, 'click', function() {
                    self.handleMarkerSelection(marker, fuelsite);
                    // possibly dealloc memory by label.destroy()
                });
            }, this);
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