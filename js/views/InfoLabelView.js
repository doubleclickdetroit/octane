define([ 'globals', 'utils', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(globals, utils) {

    'use strict';


    var InfoLabelView;
    InfoLabelView = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(InfoLabelView, _super);

        function InfoLabelView(options) {
            var span, div;

            // call super
            InfoLabelView.__super__.constructor.apply(this, arguments);

            // cache & create elements
            this.div_  = div  = document.createElement('div');
            this.span_ = span = document.createElement('span');

            // Initialization
            this.setValues(options);

            // label styling
            div.style.cssText  = 'position: absolute; display: none';
            span.style.cssText = 'position: relative; left: -50%; top: -26px'          +
                                 'white-space: nowrap;color:#333;'                     +
                                 'padding: 2px;font-family: Arial; font-weight: bold;' +
                                 'font-size: 10px;';

            // append child node
            div.appendChild(span);
        }

        /*
         * Public Methods
        */
        InfoLabelView.prototype.render = function(zIndex, marker, price) {
            this.set('text', price);
            this.set('zIndex', zIndex);
            this.bindTo('position', marker, 'position');
        };

        InfoLabelView.prototype.onAdd = function() {
            var pane   = this.getPanes().overlayImage,
                redraw = this.draw;

            pane.appendChild(this.div_);

            // redraw the label if text or position changes
            this.listeners_ = [
                google.maps.event.addListener(this, 'position_changed', redraw),
                google.maps.event.addListener(this, 'text_changed',     redraw),
                google.maps.event.addListener(this, 'zindex_changed',   redraw)
            ];
        };

        InfoLabelView.prototype.onRemove = function() {
            this.div_.parentNode.removeChild(this.div_);

            // stop updating position/text since label is removed from the map
            for(i=0; i < this.listeners_.length; i++) {
                google.maps.event.removeListener(this.listeners_[i]);
            }
        };

        InfoLabelView.prototype.draw = function() {
            var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
            this.div_.style.display = 'block';
            this.div_.style.left    = position.x + 'px';
            this.div_.style.top     = position.y + 'px';
            this.div_.style.zIndex  = this.get('zIndex');
            this.span_.innerHTML    = this.get('text').toString();
        };

        return InfoLabelView;

    })(google.maps.OverlayView);


    return InfoLabelView;
});