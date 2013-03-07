define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/page' ],
function($, _, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#settings'),

        initialize: function() {
            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(Mustache.render(tmpl));
        }
    });


    return FuelSitesView;
});