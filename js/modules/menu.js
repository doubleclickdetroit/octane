define([ 'facade', 'utils' ],
function(facade, utils) {

    'use strict';


    facade.subscribe('menu', 'navigate', function(updateHash) {
        console.log('menu navigate');
        utils.changePage('#menu');
    });
});