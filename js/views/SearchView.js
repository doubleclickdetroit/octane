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
            utils._.bindAll(this, 'render', 'pageBeforeShow');

            // cache $content
            this.$content = this.$el.find(':jqmData(role=content)');

            // model events
            this.model.on('change:location', this.render, this);
            this.model.on('invalid', function(model, error) {
                facade.publish('app', 'alert', error);
            });

            // collection events
            this.collection.on('reset', function(collection) {
                var config = utils._.clone(globals.search.configuration);

                // dynamic values for configuration-object for some fields
                config['brand']['values']    = collection.get('brand').toJSON()['values'];
                config['fuelType']['values'] = collection.get('fuelType').toJSON()['values'];

                // create page with updated configuration-object
                this.pageCreate(config);
            }, this);

            // jQM Events
            this.$el.on('pageshow', this.render);
            this.$el.on('pagebeforeshow', this.pageBeforeShow);
        },

        pageCreate: function(configuration) {
            this.$content.html(Mustache.render(
                tmpl, configuration
            ));
        },

        pageBeforeShow: function() {
            facade.publish('search', 'beforeRender', {
                'favoritesName': null,
                'viewMode'     : globals.search.constants.VIEW_MODE,
                'pageSize'     : globals.search.constants.DEFAULT_PAGE_SIZE,
                'setDefault'   : globals.search.constants.DEFAULT_SEARCH_NO
            });
        },

        render: function() {
            var criteria  = this.model.toJSON(),
                constants = globals.search.constants,
                IS_CURRENT_LOCATION = criteria.searchBy === constants.SEARCH_BY_CURRENT_LOCATION;

            this.$content
                .find('[name="'+constants.NAME_SEARCH_BY+'"]')
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

            this.$content
                .find('#setDefaultSlider').val(criteria.setDefault)
                .slider('refresh');
        },

        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function(evt) {
            var target = evt.target;
            facade.publish('search', 'updateAttribute', target.name, target.value);
        },

        handleCriteriaSubmission: function(evt) {
            var constants = globals.search.constants;

            /*
             * This is very ugly and should eventually be reworked
            */

            evt.preventDefault();                                         // prevent JS submit button action
            facade.publish('search', 'saveCriteria', function(criteria) { // callback for controller to invoke
                facade.publish('fuelsites', 'navigate');                  // request navigating to "fuelsites"
                facade.publish('criteria', 'update', criteria);           // update data within the searchDetailsModel

                // did the user indicate to save this as a default search?
                if (criteria[constants.NAME_DEFAULT_SEARCH] === constants.DEFAULT_SEARCH_YES) {
                    facade.publish('criteria', 'save');
                }
            });
        }
    });


    return SearchView;
});