define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/directions' ],
function($, _, globals, facade, Backbone, Mustache, tmpl_directions) {

    'use strict';

    var DirectionsView;
    DirectionsView = Backbone.View.extend({

        el: $('#directions'),

        events: {
            'click a': 'handleDirectionTextToSpeech'
        },

        initialize: function() {
            // set context
            _.bindAll(this, 'render', 'pageShow');

            // cache $content
            this.$content = this.$el.find(':jqmData(role=content)');

            // cache google helpers
            this.LatLng     = google.maps.LatLng;
            this.directions = new google.maps.DirectionsService();
            this.request    = {
                'travelMode': google.maps.TravelMode.DRIVING
            };

            // jQM Events
            this.$el.on('pageshow', this.pageShow);
        },

        requestDirections: function(fuelSiteModel) {
            var deferred = $.Deferred();

            // update request object
            _.extend(this.request, {
                'origin'     : new this.LatLng(fuelSiteModel.origination.latitude, fuelSiteModel.origination.longitude),
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
                else deferred.reject('Route lookup failed.');
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
            this.$content.empty();
        },

        /*
         * Event Handlers
        */
        handleDirectionTextToSpeech: function(evt) {
            evt.preventDefault();
            var $e = $(evt.target).closest('a').find('.ui-block-b');
            facade.publish('app', 'speak', $.trim($e.text()));
        }
    });


    return DirectionsView;
});