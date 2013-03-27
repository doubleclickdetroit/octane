define([ 'globals', 'utils', 'backbone' ],
function(globals, utils, Backbone) {

    'use strict';


    var InfoModel;
    InfoModel = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(InfoModel, _super);

        function InfoModel() {
            InfoModel.__super__.constructor.apply(this, arguments);
        }

        InfoModel.prototype.defaults = {
            'buildVersion': 'Unknown',
            'osVersion'   : 'Unknown',
            'deviceId'    : 'Unknown',
            'screenType'  : 'Unknown'
        };

        InfoModel.prototype.initialize = function(attrs, options) {
            var v = options.device.version,
                p = options.device.platform;

            // initially bootstrap data
            this.set({
                'buildVersion': options.device.buildVersion,
                'deviceId'    : options.device.deviceId,
                'screenType'  : options.device.screenType,
                'osVersion'   : p && v ? p + ' ' + v : 'Unknown'
            });
        };

        return InfoModel;

    })(Backbone.Model);


    return InfoModel;
});