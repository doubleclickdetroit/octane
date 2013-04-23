define([ 'globals', 'utils', 'views/MarkerLabelView', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(globals, utils, MarkerLabelView) {

    'use strict';


    var MarkerView;
    MarkerView = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(MarkerView, _super);

        /**
         * Creates a MarkerWithLabel with the options specified in {@link MarkerWithLabelOptions}.
         * @constructor
         * @param {MarkerWithLabelOptions} [opt_options] The optional parameters.
         */
        function MarkerView(opt_options) {
            opt_options                   = opt_options                   || {};
            opt_options.labelStyle        = opt_options.labelStyle        || {};
            opt_options.labelContent      = opt_options.labelContent      || "";
            opt_options.labelClass        = opt_options.labelClass        || "markerLabels";
            opt_options.labelAnchor       = opt_options.labelAnchor       || new google.maps.Point(0, 0);
            opt_options.labelInBackground = opt_options.labelInBackground || false;

            if (typeof opt_options.labelVisible === "undefined") {
                opt_options.labelVisible = true;
            }
            if (typeof opt_options.raiseOnDrag === "undefined") {
                opt_options.raiseOnDrag = true;
            }
            if (typeof opt_options.clickable === "undefined") {
                opt_options.clickable = true;
            }
            if (typeof opt_options.draggable === "undefined") {
                opt_options.draggable = false;
            }
            if (typeof opt_options.optimized === "undefined") {
                opt_options.optimized = false;
            }

            opt_options.crossImage = opt_options.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
            opt_options.handCursor = opt_options.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
            opt_options.optimized  = false; // Optimized rendering is not supported

            this.label = new MarkerLabelView(this, opt_options.crossImage, opt_options.handCursor); // Bind the label to the marker

            // Call the parent constructor. It calls Marker.setValues to initialize, so all
            // the new parameters are conveniently saved and can be accessed with get/set.
            // Marker.set triggers a property changed event (called "propertyname_changed")
            // that the marker label listens for in order to react to state changes.
            MarkerView.__super__.constructor.apply(this, arguments);
        }

        /**
         * Overrides the standard Marker setMap function.
         * @param {Map} theMap The map to which the marker is to be added.
         * @private
         */
        MarkerView.prototype.setMap = function(theMap) {
            // Call the inherited function...
            _super.prototype.setMap.apply(this, arguments);

            // ... then deal with the label:
            this.label.setMap(theMap);
        };

        return MarkerView;

    })(google.maps.Marker);


    return MarkerView;
});