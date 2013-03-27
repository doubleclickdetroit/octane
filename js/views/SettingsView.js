define([ 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/settings/page' ],
function(utils, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var SettingsView;
    SettingsView = Backbone.View.extend({

        el: utils.$('#settings'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // listen for model events
            this.model.on('change:notifications', function(model, state) {
                this.updateAlertsMenuItem(state);
            }, this);

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            var $el = this.$el.find(':jqmData(role=content)');
            $el.html(Mustache.render(tmpl));
        },

        updateAlertsMenuItem: function(state) {
            utils.$('#alerts-menu-item').text(state);
        }
    });


    return SettingsView;
});