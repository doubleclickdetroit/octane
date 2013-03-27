define([ 'utils', 'backbone', 'mustache', 'text!tmpl/info/page' ],
function(utils, Backbone, Mustache, tmpl) {

    'use strict';


    var InfoView;
    InfoView = Backbone.View.extend({

        el: utils.$('#info'),

        initialize: function () {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // create page
            this.pageCreate();
        },

        pageCreate: function () {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(Mustache.render(tmpl, this.model.toJSON()));
        },

    });


    return InfoView;
});