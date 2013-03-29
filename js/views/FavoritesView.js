define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'views/FavoriteView', 'text!tmpl/common/dialog', 'text!tmpl/favorites/favorites', 'plugin-dialog' ],
function(globals, utils, facade, Backbone, Mustache, FavoriteView, tmpl_dialog, tmpl_list) {

    'use strict';


    var FavoritesView;
    FavoritesView = Backbone.View.extend({

        el: utils.$('#favorites'),

        // cache templates
        tmpl_dialog: Mustache.compile(tmpl_dialog),

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for event listeners
            utils._.bindAll(this, 'render', 'pageShow');

            // collection events
            this.collection.on('reset', this.render, this);
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.render, this);

            // jQM events
            this.$el.on('pageshow', this.pageShow);

            // create page
            this.pageCreate();

            // cache $list
            this.$list = this.$el.find('#favoritesList');
        },

        pageCreate: function() {
            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_list));
        },

        pageShow: function() {
            this.render();                  // render the collection
            this.$list.listview('refresh'); // jQM refresh listview
        },

        render: function() {
            this.$list.empty();                             // empty nodes
            this.collection.sort().each(this.addOne, this); // sort & append
            return this;
        },

        addOne: function(favoriteModel) {
            var favoriteView = new FavoriteView({
                model: favoriteModel
            });

            this.$list.append(favoriteView.render().el); // render & append child view
        },

        displaySaveFavoriteDialog: function() {
            var $tmpl = utils.$(this.tmpl_dialog(
                globals.favorites.configuration.save
            ));

            utils.$('<div>').simpledialog2({
                mode        : 'blank',
                headerText  : globals.favorites.configuration.save.title,
                themeHeader : 'b',
                headerClose : false,
                blankContent: $tmpl
            });

            $tmpl.on('click', ':submit', function (evt) {
                var favoritesName = $tmpl.find(':text').val();

                // validate presence of value
                if (favoritesName === '') {
                    facade.publish('app', 'alert', globals.favorites.configuration.save.error);
                    return false;
                }

                // unbind all events
                $tmpl.off();

                // broadcast insert event and value
                facade.publish('favorites', 'save', {
                    id           : null,
                    viewMode     : 'favorites',
                    favoritesName: favoritesName
                });

                // close the dialog
                utils.$(document).trigger('simpledialog', {method:'close'});
            });
        }
    });


    return FavoritesView;
});