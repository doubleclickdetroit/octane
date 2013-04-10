define([ 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/fuelsite' ],
function(globals, facade, Backbone, Mustache, tmpl ) {

    'use strict';


    var FuelSiteView;
    FuelSiteView = Backbone.View.extend({

        tagName: 'li',

        events: {
            'click a': 'handleSelectedFuelsite'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            var fuelsite = this.model.hasChanged() ? this.model.toJSON() : false;
            this.$el.html(Mustache.render(tmpl, {'fuelsite': fuelsite}));
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