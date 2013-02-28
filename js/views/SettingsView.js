define([ 'jquery', 'underscore', 'facade', 'backbone', 'mustache', 'text!tmpl/settings/list' ],
function($, _, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var SettingsView;
    SettingsView = Backbone.View.extend({

        el: $('#settings'),

        initialize: function() {
            _.bindAll(this, 'pageCreate');

            // jQM event listeners
            this.$el.on('pagecreate', this.pageCreate);

            // listen for broadcasting
            facade.subscribe('alerts', 'notifications:change', this.updateAlertsMenuItem);
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