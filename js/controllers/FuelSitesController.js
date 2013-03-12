define([ 'utils', 'views/FuelSitesView', 'collections/FuelSitesCollection', 'managers/SearchDetailsDatabaseManager', 'models/LocationModel', 'models/SearchDetailsModel' ],
function(utils, FuelSitesView, FuelSitesCollection, SearchDetailsDatabaseManager, LocationModel, SearchDetailsModel) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        var locationModel, searchDetailsModel, fuelSitesCollection, fuelSitesView;

        function FuelSitesController() {}

        FuelSitesController.prototype.init = function() {

            // initialize classes
            locationModel = new LocationModel();

            searchDetailsModel = new SearchDetailsModel({
                location: locationModel,
                database: SearchDetailsDatabaseManager.getInstance()
            });

            fuelSitesCollection = new FuelSitesCollection({
                searchDetails: searchDetailsModel
            });

            fuelSitesView = new FuelSitesView({
                collection: fuelSitesCollection
            });

            // kick-off the location
            locationModel.locateFromCurrentLocation();
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites', null, true);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});