define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/page' ],
function($, _, facade, Backbone, Mustache, tmpl_header, tmpl_list) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        template: Mustache.compile(tmpl_list),

        initialize: function(options) {
            this.collection = options.collection;

            this.collection.on('reset', function(collection) {
                var sites = collection.map(function(fuelsite) {
                    return fuelsite.get('name');
                });
                console.log(sites);
            });

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=header)');
            $el.append(Mustache.render(tmpl_header));
        }
    });


    return FuelSitesView;
});