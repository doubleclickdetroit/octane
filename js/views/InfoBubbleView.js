define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'plugin-infobubble', 'text!tmpl/fuelsites/bubble' ],
function(globals, utils, facade, Backbone, Mustache, InfoBubble, tmpl_buble) {

    'use strict';


    var InfoBubbleView;
    InfoBubbleView = Backbone.View.extend({

        template: Mustache.compile(tmpl_buble),

        events: {
            'click .phoneysubtext': 'handleFuelSiteSelection'
        },

        initialize: function(options) {
            // chache map
            this.map = options.map;

            // chache infoBubble
            this.infoBubble = new InfoBubble(utils._.extend(
                {'map': this.map},
                globals.fuelsites.configuration.bubble
            ));
        },

        render: function(marker) {
            var content = this.$el.html(this.template(this.model.toJSON()));
            this.infoBubble.setContent(this.el);
            this.infoBubble.open(this.map, marker);
        },

        /*
         * Event Handlers
        */
        handleFuelSiteSelection: function(evt) {
            evt.preventDefault();
            facade.publish('fuelsites', 'selectedFuelSite', this.model.cid);
        }
    });


    return InfoBubbleView;
});