define([ 'models/SearchDetailsModel' ],
function(SearchDetailsModel) {

    'use strict';


    var SearchDetailsController;
    SearchDetailsController = (function() {

        var searchDetailsModel;

        function SearchDetailsController() {}

        SearchDetailsController.prototype.init = function(delegate) {
            searchDetailsModel = new SearchDetailsModel();

            // dispatch model events to delegate
            searchDetailsModel.on('all', delegate);

            // on initial model data, perform fetch
            searchDetailsModel.once('change', searchDetailsModel.fetch);
        };

        SearchDetailsController.prototype.updateLocationAttributes = function(location) {
            searchDetailsModel.set(searchDetailsModel.defaults, {silent:true});
            searchDetailsModel.set(location);
        };

        return SearchDetailsController;
    })();


    return new SearchDetailsController();
});