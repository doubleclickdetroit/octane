define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache' ],
function($, _, facade, Backbone, Mustache) {

    'use strict';


    var SearchView;
    SearchView = Backbone.View.extend({

        el: $('#search'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            // $el.html(Mustache.render(tmpl));
        }
    });


    return SearchView;
});