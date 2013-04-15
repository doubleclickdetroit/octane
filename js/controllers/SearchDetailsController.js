define([ 'models/LocationModel', 'models/SearchDetailsModel' ],
function(LocationModel, SearchDetailsModel) {

    'use strict';


    var SearchDetailsController;
    SearchDetailsController = (function() {

        var locationModel, searchDetailsModel;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function SearchDetailsController() {
            // cache model instances
            locationModel      = new LocationModel();
            searchDetailsModel = SearchDetailsModel.getInstance();

            // handle triggering searchDetailsModel "loadingend" event
            locationModel.on('fail', function() {searchDetailsModel.trigger('loadingend');});
            searchDetailsModel.on('change', function() {searchDetailsModel.trigger('loadingend');});
        }

        SearchDetailsController.prototype.init = function() {
            // listen for location events
            locationModel.on('change', function(location) {
                searchDetailsModel.set(searchDetailsModel.defaults, {'silent':true});
                searchDetailsModel.set(location.toJSON());
            });

            // listen for location failure and default to manually entering a location
            locationModel.on('fail', function() {
                searchDetailsModel.set({'searchBy': 'enterLocation'});
            });

            // handle case of no default search value
            searchDetailsModel.on('withoutDefaultSearchValue', function() {
                locationModel.locateFromCurrentLocation();
            });
        };

        /*
         * Public Methods
        */
        SearchDetailsController.prototype.loadAttributes = function() {
            searchDetailsModel.trigger('loadingbegin');
            searchDetailsModel.fetch();
        };

        SearchDetailsController.prototype.updateAttributes = function(attributes) {
            searchDetailsModel.set(attributes);
        };

        SearchDetailsController.prototype.saveAttributes = function() {
            searchDetailsModel.destroy({                            // delete previous record
                callback: function() { searchDetailsModel.save(); } // save the new record
            });
        };

        return SearchDetailsController;
    })();


    return new SearchDetailsController();
});