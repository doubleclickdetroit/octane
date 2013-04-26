define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/directions' ],
function(globals, utils, facade, Backbone, Mustache, tmpl_directions) {

    'use strict';

    var DirectionsView;
    DirectionsView = Backbone.View.extend({

        el: utils.$('#directions'),

        events: {
            'click a.text-to-speech': 'handleDirectionTextToSpeech'
        },

        initialize: function() {
            // set context
            utils._.bindAll(this, 'render', 'pageShow');

            // cache map button
            this.$mapBtn = this.$el.find('a.btn-map');
            this.$mapBtn.data('orig-href', this.$mapBtn.attr('href'));

            // cache $content
            this.$content = this.$el.find(':jqmData(role=content)');

            // cache fuelSiteModel
            this.fuelSiteModel = null;

            // cache google helpers
            this.LatLng     = google.maps.LatLng;
            this.directions = new google.maps.DirectionsService();
            this.request    = {
                'travelMode': google.maps.TravelMode.DRIVING
            };

            // jQM Events
            this.$el.on('pageshow', this.pageShow);
        },

        requestDirections: function() {
            var deferred      = utils.Deferred(),
                fuelSiteModel = this.fuelSiteModel.toJSON();

            // update request object
            utils._.extend(this.request, {
                'origin'     : new this.LatLng(this.model.get('latitude'), this.model.get('longitude')),
                'destination': new this.LatLng(fuelSiteModel.location.latitude, fuelSiteModel.location.longitude)
            });

            // request directions for route
            this.directions.route(this.request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    deferred.resolve({
                        'details': fuelSiteModel,
                        'route'  : response.routes[0].legs[0]
                    });
                }
                else {
                    deferred.reject('Route lookup failed.');
                }
            });

            // return promisary object
            return deferred.promise();
        },

        render: function(route) {
            var content = Mustache.render(tmpl_directions, route);
            this.$content.html(content).find(':jqmData(role=listview)').listview();
        },

        handleError: function(message) {
            message += ' Please try again later.'; // this should be in globals
            facade.publish('app', 'alert', message);
        },

        /*
         * jQM Events
        */
        pageShow: function() {
            var mapPath = this.$mapBtn.data('orig-href') +'/'+ this.fuelSiteModel.cid;
            this.$content.empty();
            this.$mapBtn.attr('href', mapPath);
        },

        /*
         * Event Handlers
        */
        handleDirectionTextToSpeech: function(evt) {
            evt.preventDefault();
            var $e = utils.$(evt.target).closest('a').find('.ui-block-b');
            facade.publish('app', 'speak', utils.trim($e.text()));
        }
    });


    return DirectionsView;
});