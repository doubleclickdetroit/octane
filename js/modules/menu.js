define([ 'utils', 'views/menu' ],
function(utils, menuView) {

    'use strict';


    var menuModule;
    menuModule = (function() {

        function navigate() {
            utils.changePage('#menu', null, true);
        }

        return {
            navigate: navigate
        };
    })();


    return menuModule;
});