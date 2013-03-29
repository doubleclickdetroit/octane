define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/favorites/favorite' ],
function(globals, utils, facade, Backbone, Mustache, tmpl_item) {

    'use strict';


    var FavoriteView;
    FavoriteView = Backbone.View.extend({

        tagName: 'li',
        className: 'favorites-li',

        events: {
            'click a': 'handleRemoveFavorite'
        },

        initialize: function() {
            //
        },

        render: function() {
            this.$el.html(Mustache.render(tmpl_item, this.model.toJSON()));
            return this;
        },

        handleRemoveFavorite: function(evt) {
            evt.preventDefault();
            facade.publish('favorites', 'delete', this.model);
        }

    });


    return FavoriteView;
});