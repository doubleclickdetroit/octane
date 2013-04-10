define([ 'facade', 'controllers/TermsAndConditionsController' ],
function(facade, controller) {

    'use strict';


    var subscribe;
    subscribe = facade.subscribeTo('termsAndConditions', controller);

    subscribe('navigate', 'navigate');


    return {
        init: function() {
            controller.init();
        }
    };
});