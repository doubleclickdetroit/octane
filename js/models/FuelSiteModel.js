define([ 'utils', 'globals', 'backbone' ],
function(utils, globals, Backbone) {

    'use strict';


    var FuelSiteModel;
    FuelSiteModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(FuelSiteModel, _super);

        function FuelSiteModel() {
            FuelSiteModel.__super__.constructor.apply(this, arguments);
        }

        FuelSiteModel.prototype.initialize = function() {
            this.formatAttributes();

            // set the origin location attributes
            this.set({
                'origination': {
                    'latitude' : this.origination.latitude,
                    'longitude': this.origination.longitude
                }
            });
        };

        FuelSiteModel.prototype.formatAttributes = function() {
            // add new formatted attributes
            this.set('format_ppg', function() {
                var ppg = this.ppg;
                if (!ppg) return false;
                return parseFloat(ppg).toFixed(2);
            });
            this.set('format_ppg_sup', function() {
                var ppg = this.ppg;
                if (!ppg) return '';
                return ppg.substring(ppg.indexOf('.')+3);
            });
            this.set('format_time', function() {
                var time = this.transactionTime;
                return (this.ppg && time) ? utils.timeago(new Date(parseInt(time))) : 'Unavailable';
            });
            this.set('format_telephone', function() {
                var phone = this.telephone;
                return phone ? phone.replace(/-/,'') : '';
            });
        };

        return FuelSiteModel;

    })(Backbone.Model);


    return FuelSiteModel;
});