define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/list', 'text!tmpl/fuelsites/list-item' ],
function($, _, facade, Backbone, Mustache, tmpl_header, tmpl_list, tmpl_item) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        template: Mustache.compile(tmpl_item),

        initialize: function(options) {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // cache collection
            this.collection = options.collection;

            this.collection
                // render collection on reset
                .on('reset', this.render, this)

                // listen for loading event
                .on('loadingstart', function() {
                    this.showLoadingIndicator(true);
                }, this);

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
