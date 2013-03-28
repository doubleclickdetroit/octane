define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/common/dialog', 'plugin-dialog' ],
function(globals, utils, facade, Backbone, Mustache, tmpl_dialog) {

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
            utils._.bindAll(this, 'render');
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
                facade.publish('favorites', 'insert', {
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