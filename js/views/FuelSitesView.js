define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'views/FuelSiteView', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/fuelsites', 'text!tmpl/fuelsites/criteria', 'text!tmpl/common/dialog', 'plugin-dialog' ],
function(globals, utils, facade, Backbone, Mustache, FuelSiteView, tmpl_header, tmpl_fuelsites, tmpl_criteria, tmpl_dialog) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: utils.$('#fuelsites'),

        // cache templates
        tmpl_criteria: Mustache.compile(tmpl_criteria),
        tmpl_dialog  : Mustache.compile(tmpl_dialog),

        events: {
            'click .btn-save': 'displaySaveDialog',
            'click .btn-sort': 'displaySortDialog'
        },

        initialize: function (options) {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for methods
            utils._.bindAll(this, 'pageInit');

            // cache criteriaModel
            this.criteriaModel = options.criteriaModel;

            // collection events
            this.listenTo(this.collection, 'reset', this.render);

            // jQM Events
            this.$el.one('pageshow', this.pageInit); // initial pageshow

            // create page
            this.pageCreate();

            // cache $criteria & $list
            this.$criteria = this.$el.find('.searchtext');
            this.$list     = this.$el.find('#fuelStationsList');
        },

        pageCreate: function () {
            // append the header
            this.$el.find(':jqmData(role=header)').append(Mustache.render(tmpl_header, {
                'excludeSort': false
            }));

            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_fuelsites));
        },

        render: function () {
            // empty $list
            this.$list.empty();

            // handle empty collection
            if (this.collection.isEmpty()) {
                this.collection.add(new Backbone.Model(), {'silent': true});
            }

            // populate $list
            this.collection.each(function (fuelsite) {
                var fuelsiteView = new FuelSiteView({model: fuelsite}).render();
                this.$list.append(fuelsiteView.$el); // add fuelsite to the list
            }, this);

            // render $criteria
            this.$criteria.html(this.tmpl_criteria(
                this.criteriaModel.toJSON()
            ));

            // render $list
            this.$list.listview('refresh');
        },

        /*
         * jQM Page Events
        */
        pageInit: function () {
            // load criteria
            facade.publish('criteria', 'load');
        },

        /*
         * Event Handlers
        */
        displaySaveDialog: function (evt) {
            evt.preventDefault();
            facade.publish('favorites', 'prompt');
        },

        displaySortDialog: function () {
            var $tmpl, sortBy;

            $tmpl = utils.$(this.tmpl_dialog(
                globals.fuelsites.configuration.sortBy
            ));

            // Get the current Sort By value
            sortBy = this.criteriaModel.get('sortBy');

            utils.$('<div>').simpledialog2({
                mode        : 'blank',
                headerText  : globals.fuelsites.configuration.sortBy.title,
                themeHeader : 'b',
                headerClose : false,
                blankContent: $tmpl
            });

            // Set the currently selected sort by value as the Active button
            utils.$('input[value=' + sortBy + ']').parent().addClass('ui-btn-active');

            $tmpl.one('click', ':input', function () {
                // broadcast updated criteria sortBy value
                facade.publish('criteria', 'update', {
                    sortBy: utils.$(this).val()
                });
            });
        }
    });


    return FuelSitesView;
});
