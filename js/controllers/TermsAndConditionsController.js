define([ 'utils', 'views/TermsAndConditionsView' ],
function(utils, TermsAndConditionsView) {

    'use strict';


    var TermsAndConditionsController;
    TermsAndConditionsController = (function () {
    	
    	var termsAndConditionsView;

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        function TermsAndConditionsController() {}
        TermsAndConditionsController.prototype.init = function () {
        	// create view
        	termsAndConditionsView = new TermsAndConditionsView();
        };

        /*
         * Public Methods
        */
        TermsAndConditionsController.prototype.navigate = function () {
        	utils.changePage(termsAndConditionsView.$el, null, null, true);
        };

        return TermsAndConditionsController;
    })();


    return new TermsAndConditionsController();
});