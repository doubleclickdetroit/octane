define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'tmpl/fuelsites/mixin', 'text!tmpl/fuelsites/header', 'text!tmpl/fuelsites/fuelsites', 'text!tmpl/fuelsites/search-criteria', 'text!tmpl/fuelsites/fuelsite', 'text!tmpl/fuelsites/dialog', 'plugin-dialog' ],
function($, _, globals, facade, Backbone, Mustache, mixin, tmpl_header, tmpl_fuelsites, tmpl_criteria, tmpl_fuelsite, tmpl_dialog) {

    'use strict';


    var FuelSitesView;
    FuelSitesView = Backbone.View.extend({

        el: $('#fuelsites'),

        // cache templates
        tmpl_criteria: Mustache.compile(tmpl_criteria),
        tmpl_fuelsite: Mustache.compile(tmpl_fuelsite),
        tmpl_dialog  : Mustache.compile(tmpl_dialog),

        events: {
            'click #btn-save' : 'displaySaveDialog',
            'click #btn-sort' : 'displaySortDialog'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context for methods
            _.bindAll(this, 'pageInit');

            // jQM Events
            this.$el.one('pageshow', this.pageInit); // initial pageshow

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            // append the header
            this.$el.find(':jqmData(role=header)').append(Mustache.render(tmpl_header));

            // append the list
            this.$el.find(':jqmData(role=content)').append(Mustache.render(tmpl_fuelsites));
        },

        render: function(criteria, fuelsites) {
            // render search criteria
            this.$el.find('#searchCriteriaText')
                .html(this.tmpl_criteria({
                    criteria: criteria
                }));

            // render fuel sites list
            this.$el.find('#fuelStationsList')
                .html(this.tmpl_fuelsite({
                    mixin    : mixin,
                    fuelsites: fuelsites
                }))
                .listview('refresh');
        },

        /*
         * jQM Page Events
        */
        pageInit: function() {
            // request current location
            facade.publish('location', 'getCurrentLocation');
        },

        /*
         * Event Handlers
        */
        displaySaveDialog: function() {
            var $tmpl = $(this.tmpl_dialog(
                globals.fuelsites.configuration.save
            ));

            $('<div>').simpledialog2({
                mode        : 'blank',
                headerText  : globals.fuelsites.configuration.save.title,
                themeHeader : 'b',
                headerClose : false,
                blankContent: $tmpl
            });

            $tmpl.on('click', ':submit', function(evt) {
                var val = $tmpl.find(':text').val();

                // validate presence of value
                if (val === '') {
                    facade.publish('app', 'alert', globals.fuelsites.configuration.save.error);
                    return false;
                }

                // unbind all events
                $tmpl.off();

                // broadcast save event and value
                facade.publish('criteria', 'save', val);

                // close the dialog
                $(document).trigger('simpledialog', {method:'close'});
            });
        },

        displaySortDialog: function() {
            var $tmpl = $(this.tmpl_dialog(
                globals.fuelsites.configuration.sortBy
            ));

            $('<div>').simpledialog2({
                mode        : 'blank',
                headerText  : globals.fuelsites.configuration.sortBy.title,
                themeHeader : 'b',
                headerClose : false,
                blankContent: $tmpl
            });

            $tmpl.one('click', ':input', function() {
                // broadcast updated criteria sortBy value
                facade.publish('criteria', 'update', {sortBy:$(this).val()});
            });
        }
    });


    return FuelSitesView;
});
