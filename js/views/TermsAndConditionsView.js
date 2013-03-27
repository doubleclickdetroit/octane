define([ 'utils', 'backbone', 'mustache', 'text!tmpl/termsandconditions/page' ],
function(utils, Backbone, Mustache, tmpl) {

    'use strict';


    var TermsAndConditionsView;
    TermsAndConditionsView = Backbone.View.extend({

        el: utils.$('#termsAndConditions'),

        initialize: function () {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // create page
            this.pageCreate();
        },

        pageCreate: function () {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(Mustache.render(tmpl));
        },

    });


    return TermsAndConditionsView;
});