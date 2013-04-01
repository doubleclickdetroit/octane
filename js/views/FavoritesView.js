define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'views/FavoriteView', 'text!tmpl/favorites/favorites' ],
function(globals, utils, facade, Backbone, Mustache, FavoriteView, tmpl_list) {

    'use strict';


    var FavoritesView;
    FavoritesView = Backbone.View.extend({

        el: utils.$('#favorites'),

        events: {
            'click #editableFavoritesButton': 'handleEditableToggle'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for event listeners
            utils._.bindAll(this, 'render', 'pageHide');

            // collection events
            this.collection.on('reset', this.addAll, this);
            this.collection.on('add', this.addOne, this);
            this.collection.on('remove', this.render, this);

            // jQM events
            this.$el.on('pageshow', this.render);
            this.$el.on('pagehide', this.pageHide);

            // create page
            this.pageCreate();

            // cache $list
            this.$list = this.$el.find('#favoritesList');
            this.$button = this.$el.find('#editableFavoritesButton');
        },

        pageCreate: function() {
            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_list));
        },

        pageHide: function() {
            this.toggleEditable(false); // force toggle false
        },

        render: function() {
            this.addAll();                  // add the collection
            this.$list.listview('refresh'); // jQM refresh listview
        },

        addAll: function() {
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

        toggleEditable: function(toggle) {
            var label    = globals.favorites.configuration.editable,
                CNAME    = globals.favorites.constants.CLASSNAME_EDITABLE,
                editable = this.$el.toggleClass(CNAME, toggle).hasClass(CNAME);

            this.$button.find('.ui-btn-text').text(editable ? label.done : label.edit);
            facade.publish('favorites', 'editable', editable);
        },

        /*
         * Event Handlers
        */
        handleEditableToggle: function(evt) {
            evt.preventDefault();
            this.toggleEditable(null); // allow toggle
        }
    });


    return FavoritesView;
});