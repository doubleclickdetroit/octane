define([ 'models/SearchDetailsModel' ],
function(SearchDetailsModel) {

    'use strict';


    var SearchDetailsController;
    SearchDetailsController = (function() {

        var searchDetailsModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchDetailsController() {}
        SearchDetailsController.prototype.init = function(delegate) {
            // cache model instance
            searchDetailsModel = new SearchDetailsModel();

            // dispatch model events to delegate
            searchDetailsModel.on('all', delegate);

            // on initial model data, perform fetch
            searchDetailsModel.once('change', searchDetailsModel.fetch);
        };

        /*
         * Public Methods
        */
        SearchDetailsController.prototype.updateAttributes = function(attributes) {
            searchDetailsModel.set(attributes);
        };

        SearchDetailsController.prototype.saveAttributes = function() {
            searchDetailsModel.destroy({                            // delete previous record
                callback: function() { searchDetailsModel.save(); } // save the new record
            });
        };

        SearchDetailsController.prototype.updateLocationAttributes = function(location) {
            searchDetailsModel.set(searchDetailsModel.defaults, {silent:true});
            searchDetailsModel.set(location);
        };

        return SearchDetailsController;
    })();


    return new SearchDetailsController();
});