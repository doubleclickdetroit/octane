define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/settings/page' ],
function($, _, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var SettingsView;
    SettingsView = Backbone.View.extend({

        el: $('#settings'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // listen for broadcasting
            facade.subscribe('alerts', 'notifications:change', this, 'updateAlertsMenuItem');

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(Mustache.render(tmpl));
        },

        updateAlertsMenuItem: function(state) {
            $('#alerts-menu-item').text(state);
        }
    });


    return SettingsView;
});