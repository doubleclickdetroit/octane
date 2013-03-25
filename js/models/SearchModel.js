define([ 'globals', 'utils', 'backbone' ],
function(globals, utils, Backbone) {

    'use strict';


    var SearchModel;
    SearchModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(SearchModel, _super);

        function SearchModel() {
            SearchModel.__super__.constructor.apply(this, arguments);
        }

        SearchModel.prototype.initialize = function() {
            this.on('change:searchBy', this.handleLocationAndSearchByAttributes, this);
        };

        SearchModel.prototype.validate = function() {
            if (this.get('location') === '') {
                return globals.search.constants.INVALID_LOCATION_MESSAGE
            }
        };

        SearchModel.prototype.sync = function(method, model, options) {
            // override to prevent from trying to UPDATE server
        };

        SearchModel.prototype.handleLocationAndSearchByAttributes = function(model, searchBy) {
            if (searchBy === globals.search.constants.SEARCH_BY_ENTER_LOCATION) {
                this.set({
                    'location' : '',
                    'latitude' : null,
                    'longitude': null
                });
            }
        };

        return SearchModel;
    })(Backbone.Model);


    return SearchModel;
});