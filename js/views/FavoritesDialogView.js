define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/common/dialog', 'plugin-dialog' ],
function(globals, utils, facade, Backbone, Mustache, tmpl_dialog) {

    'use strict';


    var FavoritesDialogView;
    FavoritesDialogView = Backbone.View.extend({

        tagName: 'div',

        template: Mustache.render(tmpl_dialog, globals.favorites.configuration.save),

        initialize: function() {
            // set context
            utils._.bindAll(this, 'handleAddFavorite');

            // cache $content
            this.$content = utils.$(this.template);

            // manual event listeners
            this.$content.on('click', ':submit', this.handleAddFavorite);
        },

        render: function() {
            this.$el.simpledialog2({
                'mode'        : 'blank',
                'headerText'  : globals.favorites.configuration.save.title,
                'themeHeader' : 'b',
                'headerClose' : false,
                'blankContent': this.$content
            });
        },

        handleAddFavorite: function(evt) {
            var favoritesName = this.$content.find(':text').val();

            // validate presence of value
            if (favoritesName === '') {
                facade.publish('app', 'alert', globals.favorites.configuration.save.error);
                return false;
            }

            // unbind all events
            this.$content.off();

            // broadcast insert event and value
            facade.publish('favorites', 'save', {
                'id'           : null,
                'favoritesName': favoritesName,
                'viewMode'     : globals.favorites.constants.VIEW_MODE
            });

            // close the dialog
            utils.$(document).trigger('simpledialog', {method:'close'});
        }
    });


    return FavoritesDialogView;
});