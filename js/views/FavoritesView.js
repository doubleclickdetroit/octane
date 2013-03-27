define([ 'globals', 'utils', 'backbone', 'mustache' ],
function(globals, utils, Backbone, Mustache) {

    'use strict';


    var FavoritesView;
    FavoritesView = Backbone.View.extend({

        el: utils.$('#favorites'),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for event listeners
            utils._.bindAll(this, 'render');
        }
    });


    return FavoritesView;
});