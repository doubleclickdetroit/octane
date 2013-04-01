define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/favorites/favorite' ],
function(globals, utils, facade, Backbone, Mustache, tmpl_item) {

    'use strict';


    var FavoriteView;
    FavoriteView = Backbone.View.extend({

        tagName: 'li',
        className: 'favorites-li',

        events: {
            'click a': 'handleFavoriteDelegation'
        },

        render: function() {
            this.$el.html(Mustache.render(tmpl_item, this.model.toJSON()));
            return this;
        },

        removeFavorite: function() {
            var self     = this,
                prompt   = globals.favorites.configuration.confirm,
                message  = prompt.message,
                callback = function(id) {
                    if (id === 1) {
                        self.$el.slideUp('fast', function() {
                            facade.publish('favorites', 'remove', self.model);
                        });
                    }
                };

            facade.publish('app', 'confirm', message, callback);
        },

        /*
         * Event Handlers
        */
        handleFavoriteDelegation: function(evt) {
            evt.preventDefault();
            if (this.model.collection.isEditable) {
                this.removeFavorite();
            }
            else {
                facade.publish('fuelsites', 'navigate');
                facade.publish('criteria', 'update', this.model.toJSON());
            }
        },
    });


    return FavoriteView;
});