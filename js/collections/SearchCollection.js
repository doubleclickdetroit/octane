define([ 'underscore', 'globals', 'utils', 'backbone' ],
function(_, globals, utils, Backbone) {

    'use strict';


    var SearchCollection;
    SearchCollection = (function(_super) {

        /*
         * Private Methods
        */
        function makeRequests() {
            var deferred   = utils.Deferred(),
                webservice = globals.WEBSERVICE;

            utils
                .when(
                    utils.$.getJSON(webservice.BRANDS.URL),
                    utils.$.getJSON(webservice.FUEL_TYPES.URL)
                )
                .done(function(brands, fuelTypes) {
                    deferred.resolve([
                        {
                            'id'    : globals.search.constants.NAME_BRAND,
                            'values': configurationObjectAdapter(brands[0])
                        },
                        {
                            'id'    : globals.search.constants.NAME_FUEL_TYPE,
                            'values': configurationObjectAdapter(fuelTypes[0])
                        }
                    ]);
                });

            return deferred.promise();
        }

        // format to match globals.search.configuration
        function configurationObjectAdapter(values) {
            return _.map(values, function(value) {
                return {
                    'label': value,
                    'value': value
                }
            });
        }

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(SearchCollection, _super);

        function SearchCollection() {
            SearchCollection.__super__.constructor.apply(this, arguments);
        }

        // SearchCollection.prototype.model = FormFieldModel;

        SearchCollection.prototype.sync = function(method, model, options) {
            if (method === 'read') {
                var self = this;                                      // set context
                self.trigger('loadingbegin');                         // trigger loadingbegin
                utils.when(makeRequests())                            // request data
                    .then(function() { self.trigger('loadingend'); }) // trigger loadingend
                    .done(function(data) { self.reset(data); });      // reset data
            }
        };

        return SearchCollection;

    })(Backbone.Collection);


    return SearchCollection;
});