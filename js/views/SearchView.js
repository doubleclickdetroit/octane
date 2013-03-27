define([ 'globals', 'utils', 'facade', 'backbone', 'mustache', 'text!tmpl/search/form' ],
function(globals, utils, facade, Backbone, Mustache, tmpl) {

    'use strict';


    var SearchView;
    SearchView = Backbone.View.extend({

        el: utils.$('#search'),

        events: {
            'change :input'             : 'handleUpdatingAttribute',
            'click #submitCriteria-btn' : 'handleCriteriaSubmission'
        },

        initialize: function() {
            // call super
            this.constructor.__super__.initialize.apply(this, arguments);

            // set context
            utils._.bindAll(this, 'render');

            // cache $content
            this.$content = this.$el.find(':jqmData(role=content)');

            // model events
            this.model.on('change:location', this.render, this)
            this.model.on('invalid', function(model, error) {
                facade.publish('app', 'alert', error);
            });

            // collection events
            this.collection.on('reset', function(collection) {
                var configuration = utils._.clone(globals.search.configuration);

                // dynamic values for configuration-object for some fields
                configuration['brand'][0]['values']    = collection.get('brand').toJSON()['values'];
                configuration['fuelType'][0]['values'] = collection.get('fuelType').toJSON()['values'];

                // create page with updated configuration-object
                this.pageCreate(configuration);
            }, this);

            // jQM Events
            this.$el.on('pageshow', this.render);
            this.$el.on('pagebeforeshow', function() {
                facade.publish('search', 'beforeRender');
            });
        },

        pageCreate: function(configuration) {
            this.$content.html(Mustache.render(
                tmpl, configuration
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

            facade.publish('search', 'saveCriteria', function(criteria) { // callback for controller to invoke
                facade.publish('fuelsites', 'navigate');                  // request navigating to "fuelsites"
                facade.publish('criteria', 'update', criteria);           // update data within the searchDetailsModel
            });
        }
    });


    return SearchView;
});