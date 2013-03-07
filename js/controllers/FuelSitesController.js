define([ 'utils', 'views/FuelSitesView', 'collections/FuelSitesCollection', 'managers/SearchDetailsDatabaseManager', 'models/LocationModel', 'models/SearchDetailsModel' ],
function(utils, FuelSitesView, FuelSitesCollection, SearchDetailsDatabaseManager, LocationModel, SearchDetailsModel) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        function FuelSitesController() {}

        var database, searchDetailsModel, locationModel;

        FuelSitesController.prototype.init = function() {
            database = SearchDetailsDatabaseManager.getInstance();

            locationModel = new LocationModel();

            searchDetailsModel = new SearchDetailsModel({
                database: database
            });

            locationModel.once('change', function(model) {
                searchDetailsModel.fetch();
            });

            locationModel.on('change', function(model) {
                searchDetailsModel.set(model.toJSON());
            });

            searchDetailsModel.on('change', function(model) {
                console.log('searchDetailsModel changed', model.toJSON());
            });

            /*
            setTimeout(function() {
                console.log('searchDetailsModel save()');
                searchDetailsModel.save();
            }, 5000);
            */
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites', null, true);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});