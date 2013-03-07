define([ 'utils', 'views/MenuView' ],
function(utils, MenuView) {

    'use strict';


    var MenuController;
    MenuController = (function() {

        function MenuController() {}

        var database, searchDetailsModel, locationModel;

        MenuController.prototype.init = function() {};

        MenuController.prototype.navigate = function() {
            utils.changePage('#menu', null, true);
        };

        return MenuController;
    })();


    return new MenuController();
});