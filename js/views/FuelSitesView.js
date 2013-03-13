define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'tmpl/fuelsites/mixin', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/list', 'text!tmpl/fuelsites/search-criteria', 'text!tmpl/fuelsites/list-item' ],
function($, _, facade, Backbone, Mustache, tmpl_mixin, tmpl_header, tmpl_list, tmpl_criteria, tmpl_item) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        // cache templates
        tmpl_criteria: Mustache.compile(tmpl_criteria),
        tmpl_item    : Mustache.compile(tmpl_item),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for methods
            _.bindAll(this, 'pageShow');

            // jQM Events
            this.$el.on('pageshow', this.pageShow);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            // append the header
            this.$el.find(':jqmData(role=header)').append(Mustache.render(tmpl_header));

            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_list));
        },

        pageShow: function() {
            // request current location
            facade.publish('location', 'getCurrentLocation');
        },

        render: function(criteria, fuelsites) {
            // render search criteria
            this.$el.find('#searchCriteriaText')
                .html(this.tmpl_criteria({
                    criteria: criteria
                }));

            // render fuel sites list
            this.$el.find('#fuelStationsList')
                .html(this.tmpl_item({
                    mixin    : tmpl_mixin,
                    fuelsites: fuelsites
                }))
                .listview('refresh');
        }
    });


    return FuelSitesView;
});
