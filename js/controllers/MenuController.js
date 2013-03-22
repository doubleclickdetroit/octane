define([ 'utils', 'views/MenuView' ],
function(utils, MenuView) {

    'use strict';


    var MenuController;
    MenuController = (function() {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function MenuController() {}
        MenuController.prototype.init = function() {};

        /*
         * Public Methods
        */
        MenuController.prototype.navigate = function() {
            utils.changePage('#menu', null, true);
        };

        return MenuController;
    })();


    return new MenuController();
});