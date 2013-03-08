define([ 'utils', 'views/FuelSitesView', 'collections/FuelSitesCollection', 'managers/SearchDetailsDatabaseManager', 'models/LocationModel', 'models/SearchDetailsModel' ],
function(utils, FuelSitesView, FuelSitesCollection, SearchDetailsDatabaseManager, LocationModel, SearchDetailsModel) {

    'use strict';


    var FuelSitesController;
    FuelSitesController = (function() {

        function FuelSitesController() {}

        var searchDetailsModel, fuelSitesCollection, fuelSitesView;

        FuelSitesController.prototype.init = function() {

            // initialize classes
            searchDetailsModel = new SearchDetailsModel({
                location: new LocationModel(),
                database: SearchDetailsDatabaseManager.getInstance()
            });

            window.fuelSitesCollection = fuelSitesCollection = new FuelSitesCollection({
                searchDetails: searchDetailsModel
            });

            fuelSitesView = new FuelSitesView({
                collection: fuelSitesCollection
            });
        };

        FuelSitesController.prototype.navigate = function() {
            utils.changePage('#fuelsites', null, true);
        };

        return FuelSitesController;
    })();


    return new FuelSitesController();
});