define([ 'routers/AppRouter', 'views/AppView', 'models/LocationModel', 'models/SearchDetailsModel' ],
function(AppRouter, AppView, LocationModel, SearchDetailsModel) {

    'use strict';


    var AppController;
    AppController = (function() {

        var appRouter, appView, locationModel, searchDetailsModel;

        function AppController() {
            //
            locationModel      = new LocationModel();
            searchDetailsModel = new SearchDetailsModel({
                location: locationModel
            });
        }

        AppController.prototype.init = function() {
            appRouter = new AppRouter();
            appView   = new AppView({
                el: document.body
            });
        };

        AppController.prototype.ready = function() {
            appRouter.start();
            appView.render();
        };

        AppController.prototype.locationModelDelegate = function(delegate) {
            locationModel.on('all', delegate);
        };

        AppController.prototype.searchDetailsModelDelegate = function(delegate) {
            searchDetailsModel.on('all', delegate);
        };

        AppController.prototype.locateFromAddress = function(address) {
            locationModel.locateFromAddress(address);
        };

        AppController.prototype.locateFromCurrentLocation = function() {
            locationModel.locateFromCurrentLocation();
        };

        return AppController;
    })();


    return new AppController();
});