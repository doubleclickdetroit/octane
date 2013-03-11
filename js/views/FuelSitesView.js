define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/list', 'text!tmpl/fuelsites/list-item' ],
function($, _, facade, Backbone, Mustache, tmpl_header, tmpl_list, tmpl_item) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        template: Mustache.compile(tmpl_item),

        initialize: function(options) {

            // cache collection
            this.collection = options.collection;

            // render collection, on reset
            this.collection
                .on('reset', this.render, this)
                .on('reset', $.mobile.hidePageLoadingMsg)
                .on('fetch', $.mobile.showPageLoadingMsg);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            // append the header
            this.$el.find(':jqmData(role=header)').append(Mustache.render(tmpl_header));

            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_list));
        },

        render: function(collection) {
            console.log(collection.toJSON());
            this.$el.find('#fuelStationsList')
                .html(this.template({fuelsites:collection.toJSON()}))
                .listview('refresh');
        }
    });


    return FuelSitesView;
});
