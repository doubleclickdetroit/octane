define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/page' ],
function($, _, facade, Backbone, Mustache, tmpl_header, tmpl_list) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        template: Mustache.compile(tmpl_list),

        initialize: function(options) {
            
            // cache collection
            this.collection = options.collection;

            // render collection, on reset
            this.collection.on('reset', this.render, this);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            // append the header
            this.$.find(':jqmData(role=header)').append(Mustache.render(tmpl_header));
            
            // append the list
            this.$.find(':jqmData(role=content)').append(Mustache.render(tmpl_list));
        },
        
        render: function(fuelsites) {
            console.log('FuelSitesView render', fuelsites);
        }
    });


    return FuelSitesView;
});
