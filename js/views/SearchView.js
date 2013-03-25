define([ 'jquery', 'underscore', 'globals', 'facade', 'backbone', 'mustache', 'text!tmpl/search/form' ],
function($, _, globals, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var SearchView;
    SearchView = Backbone.View.extend({

        el: $('#search'),

        events: {
            'change :input'             : 'handleUpdatingAttribute',
            'click #submitCriteria-btn' : 'handleCriteriaSubmission'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context
            _.bindAll(this, 'render');

            // cache $content
            this.$content = this.$el.find(':jqmData(role=content)');

            // model events
            this.model.on('change:location', this.render, this)
            this.model.on('invalid', function(model, error) {
                facade.publish('app', 'alert', error);
            });

            // jQM Events
            this.$el.on('pageshow', this.render);
            this.$el.on('pagebeforeshow', function() {
                facade.publish('search', 'beforeRender');
            });

            // create page
            this.pageCreate();
        },

        pageCreate: function() {
            this.$content.html(Mustache.render(
                tmpl,
                globals.search.configuration
            ));
        },

        render: function() {
            var criteria = this.model.toJSON(),
                IS_CURRENT_LOCATION = criteria.searchBy === globals.search.constants.SEARCH_BY_CURRENT_LOCATION;

            this.$content
                .find('[name="'+globals.search.constants.NAME_SEARCH_BY+'"]')
                .attr('checked', function() {
                    return this.value === criteria.searchBy;
                })
                .checkboxradio('refresh');

            this.$content
                .find('#locationSearch')
                .val(criteria.location)
                .textinput(IS_CURRENT_LOCATION ? 'disable' : 'enable');

            this.$content
                .find('#radiusSelector').val(criteria.radius)
                .selectmenu('refresh');

            this.$content
                .find('#fuelTypesSelector').val(criteria.fuelType)
                .selectmenu('refresh');

            this.$content
                .find('#brandsSelector').val(criteria.brand)
                .selectmenu('refresh');

            this.$content
                .find('#sortBySelector').val(criteria.sortBy)
                .selectmenu('refresh');
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target;
            facade.publish('search', 'updateAttribute', target.name, target.value);
        },

        handleCriteriaSubmission: function(evt) {
            evt.preventDefault();
            facade.publish('search', 'saveCriteria');
        }
    });


    return SearchView;
});