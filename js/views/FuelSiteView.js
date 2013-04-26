define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/fuelsites/fuelsite' ],
function(globals, utils, facade, Backbone, Mustache, tmpl ) {

    'use strict';


    var FuelSiteView;
    FuelSiteView = Backbone.View.extend({

        tagName: 'li',

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            var model    = utils._.extend(this.model.toJSON(), {'id':this.model.cid}),
                fuelsite = this.model.hasChanged() ? model : false;
            this.$el.html(Mustache.render(tmpl, {'fuelsite': fuelsite}));
            return this;
        }
    });


    return FuelSiteView;
});