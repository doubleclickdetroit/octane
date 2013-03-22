define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/fuelsite' ],
function($, _, globals, facade, Backbone, Mustache, tmpl ) {

    'use strict';


    var FuelSiteView;
    FuelSiteView = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click a': 'handleSelectedFuelsite'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(Mustache.render(tmpl, this.model.toJSON()));
            return this;
        },

        /*
         * Event Handlers
        */
        handleSelectedFuelsite: function(evt) {
            evt.preventDefault();
            facade.publish('fuelsites', 'selectedFuelSite', this.model.cid);
        }
    });


    return FuelSiteView;
});