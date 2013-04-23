define([ 'globals', 'utils', 'async!http://maps.google.com/maps/api/js?sensor=false' ],
function(globals, utils) {

    'use strict';


    var MarkerLabelView;
    MarkerLabelView = (function(_super) {

        /***********************************************************************
         * Constructor
        ***********************************************************************/
        utils.extend(MarkerLabelView, _super);

        /**
         * This constructor creates a label and associates it with a marker.
         * It is for the private use of the MarkerWithLabel class.
         * @constructor
         * @param {Marker} marker The marker with which the label is to be associated.
         * @param {string} crossURL The URL of the cross image =.
         * @param {string} handCursor The URL of the hand cursor.
         * @private
         */
        function MarkerLabelView(marker, crossURL, handCursorURL) {
            this.marker_ = marker;
            this.handCursorURL_ = marker.handCursorURL;

            this.labelDiv_ = document.createElement("div");
            this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";

            // Set up the DIV for handling mouse events in the label. This DIV forms a transparent veil
            // in the "overlayMouseTarget" pane, a veil that covers just the label. This is done so that
            // events can be captured even if the label is in the shadow of a google.maps.InfoWindow.
            // Code is included here to ensure the veil is always exactly the same size as the label.
            this.eventDiv_ = document.createElement("div");
            this.eventDiv_.style.cssText = this.labelDiv_.style.cssText;

            // This is needed for proper behavior on MSIE:
            this.eventDiv_.setAttribute("onselectstart", "return false;");
            this.eventDiv_.setAttribute("ondragstart", "return false;");

            // Get the DIV for the "X" to be displayed when the marker is raised.
            this.crossDiv_ = MarkerLabelView.getSharedCross(crossURL);

            // call super
            MarkerLabelView.__super__.constructor.apply(this, arguments);
        }

        /**
         * Returns the DIV for the cross used when dragging a marker when the
         * raiseOnDrag parameter set to true. One cross is shared with all markers.
         * @param {string} crossURL The URL of the cross image =.
         * @private
         */
        MarkerLabelView.getSharedCross = function(crossURL) {
            var div;
            if (typeof MarkerLabelView.getSharedCross.crossDiv === "undefined") {
                div = document.createElement("img");
                div.style.cssText = "position: absolute; z-index: 1000002; display: none;";
                // Hopefully Google never changes the standard "X" attributes:
                div.style.marginLeft = "-8px";
                div.style.marginTop = "-9px";
                div.src = crossURL;
                MarkerLabelView.getSharedCross.crossDiv = div;
            }
            return MarkerLabelView.getSharedCross.crossDiv;
        };

        /**
         * Adds the DIV representing the label to the DOM. This method is called
         * automatically when the marker's <code>setMap</code> method is called.
         * @private
         */
        MarkerLabelView.prototype.onAdd = function() {
            var me = this;
            var cMouseIsDown = false;
            var cDraggingLabel = false;
            var cSavedZIndex;
            var cLatOffset, cLngOffset;
            var cIgnoreClick;
            var cRaiseEnabled;
            var cStartPosition;
            var cStartCenter;
            // Constants:
            var cRaiseOffset = 20;
            var cDraggingCursor = "url(" + this.handCursorURL_ + ")";

            // Stops all processing of an event.
            //
            var cAbortEvent = function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.cancelBubble = true;
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
            };

            var cStopBounce = function() {
                me.marker_.setAnimation(null);
            };

            this.getPanes().overlayImage.appendChild(this.labelDiv_);
            this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);
            // One cross is shared with all markers, so only add it once:
            if (typeof MarkerLabelView.getSharedCross.processed === "undefined") {
                this.getPanes().overlayImage.appendChild(this.crossDiv_);
                MarkerLabelView.getSharedCross.processed = true;
            }

            this.listeners_ = [
            google.maps.event.addDomListener(this.eventDiv_, "mouseover", function(e) {
                if (me.marker_.getDraggable() || me.marker_.getClickable()) {
                    this.style.cursor = "pointer";
                    google.maps.event.trigger(me.marker_, "mouseover", e);
                }
            }),
            google.maps.event.addDomListener(this.eventDiv_, "mouseout", function(e) {
                if ((me.marker_.getDraggable() || me.marker_.getClickable()) && !cDraggingLabel) {
                    this.style.cursor = me.marker_.getCursor();
                    google.maps.event.trigger(me.marker_, "mouseout", e);
                }
            }),
            google.maps.event.addDomListener(this.eventDiv_, "mousedown", function(e) {
                cDraggingLabel = false;
                if (me.marker_.getDraggable()) {
                    cMouseIsDown = true;
                    this.style.cursor = cDraggingCursor;
                }
                if (me.marker_.getDraggable() || me.marker_.getClickable()) {
                    google.maps.event.trigger(me.marker_, "mousedown", e);
                    cAbortEvent(e); // Prevent map pan when starting a drag on a label
                }
            }),
            google.maps.event.addDomListener(document, "mouseup", function(mEvent) {
                var position;
                if (cMouseIsDown) {
                    cMouseIsDown = false;
                    me.eventDiv_.style.cursor = "pointer";
                    google.maps.event.trigger(me.marker_, "mouseup", mEvent);
                }
                if (cDraggingLabel) {
                    if (cRaiseEnabled) { // Lower the marker & label
                        position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());
                        position.y += cRaiseOffset;
                        me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
                        // This is not the same bouncing style as when the marker portion is dragged,
                        // but it will have to do:
                        try { // Will fail if running Google Maps API earlier than V3.3
                            me.marker_.setAnimation(google.maps.Animation.BOUNCE);
                            setTimeout(cStopBounce, 1406);
                        } catch (e) {}
                    }
                    me.crossDiv_.style.display = "none";
                    me.marker_.setZIndex(cSavedZIndex);
                    cIgnoreClick = true; // Set flag to ignore the click event reported after a label drag
                    cDraggingLabel = false;
                    mEvent.latLng = me.marker_.getPosition();
                    google.maps.event.trigger(me.marker_, "dragend", mEvent);
                }
            }),
            google.maps.event.addListener(me.marker_.getMap(), "mousemove", function(mEvent) {
                var position;
                if (cMouseIsDown) {
                    if (cDraggingLabel) {
                        // Change the reported location from the mouse position to the marker position:
                        mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);
                        position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);
                        if (cRaiseEnabled) {
                            me.crossDiv_.style.left = position.x + "px";
                            me.crossDiv_.style.top = position.y + "px";
                            me.crossDiv_.style.display = "";
                            position.y -= cRaiseOffset;
                        }
                        me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
                        if (cRaiseEnabled) { // Don't raise the veil; this hack needed to make MSIE act properly
                            me.eventDiv_.style.top = (position.y + cRaiseOffset) + "px";
                        }
                        google.maps.event.trigger(me.marker_, "drag", mEvent);
                    } else {
                        // Calculate offsets from the click point to the marker position:
                        cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();
                        cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();
                        cSavedZIndex = me.marker_.getZIndex();
                        cStartPosition = me.marker_.getPosition();
                        cStartCenter = me.marker_.getMap().getCenter();
                        cRaiseEnabled = me.marker_.get("raiseOnDrag");
                        cDraggingLabel = true;
                        me.marker_.setZIndex(1000000); // Moves the marker & label to the foreground during a drag
                        mEvent.latLng = me.marker_.getPosition();
                        google.maps.event.trigger(me.marker_, "dragstart", mEvent);
                    }
                }
            }),
            google.maps.event.addDomListener(document, "keydown", function(e) {
                if (cDraggingLabel) {
                    if (e.keyCode === 27) { // Esc key
                        cRaiseEnabled = false;
                        me.marker_.setPosition(cStartPosition);
                        me.marker_.getMap().setCenter(cStartCenter);
                        google.maps.event.trigger(document, "mouseup", e);
                    }
                }
            }),
            google.maps.event.addDomListener(this.eventDiv_, "click", function(e) {
                if (me.marker_.getDraggable() || me.marker_.getClickable()) {
                    if (cIgnoreClick) { // Ignore the click reported when a label drag ends
                        cIgnoreClick = false;
                    } else {
                        google.maps.event.trigger(me.marker_, "click", e);
                        cAbortEvent(e); // Prevent click from being passed on to map
                    }
                }
            }),
            google.maps.event.addDomListener(this.eventDiv_, "dblclick", function(e) {
                if (me.marker_.getDraggable() || me.marker_.getClickable()) {
                    google.maps.event.trigger(me.marker_, "dblclick", e);
                    cAbortEvent(e); // Prevent map zoom when double-clicking on a label
                }
            }),
            google.maps.event.addListener(this.marker_, "dragstart", function(mEvent) {
                if (!cDraggingLabel) {
                    cRaiseEnabled = this.get("raiseOnDrag");
                }
            }),
            google.maps.event.addListener(this.marker_, "drag", function(mEvent) {
                if (!cDraggingLabel) {
                    if (cRaiseEnabled) {
                        me.setPosition(cRaiseOffset);
                        // During a drag, the marker's z-index is temporarily set to 1000000 to
                        // ensure it appears above all other markers. Also set the label's z-index
                        // to 1000000 (plus or minus 1 depending on whether the label is supposed
                        // to be above or below the marker).
                        me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
                    }
                }
            }),
            google.maps.event.addListener(this.marker_, "dragend", function(mEvent) {
                if (!cDraggingLabel) {
                    if (cRaiseEnabled) {
                        me.setPosition(0); // Also restores z-index of label
                    }
                }
            }),
            google.maps.event.addListener(this.marker_, "position_changed", function() {
                me.setPosition();
            }),
            google.maps.event.addListener(this.marker_, "zindex_changed", function() {
                me.setZIndex();
            }),
            google.maps.event.addListener(this.marker_, "visible_changed", function() {
                me.setVisible();
            }),
            google.maps.event.addListener(this.marker_, "labelvisible_changed", function() {
                me.setVisible();
            }),
            google.maps.event.addListener(this.marker_, "title_changed", function() {
                me.setTitle();
            }),
            google.maps.event.addListener(this.marker_, "labelcontent_changed", function() {
                me.setContent();
            }),
            google.maps.event.addListener(this.marker_, "labelanchor_changed", function() {
                me.setAnchor();
            }),
            google.maps.event.addListener(this.marker_, "labelclass_changed", function() {
                me.setStyles();
            }),
            google.maps.event.addListener(this.marker_, "labelstyle_changed", function() {
                me.setStyles();
            })];
        };

        /**
         * Removes the DIV for the label from the DOM. It also removes all event handlers.
         * This method is called automatically when the marker's <code>setMap(null)</code>
         * method is called.
         * @private
         */
        MarkerLabelView.prototype.onRemove = function() {
            var i;
            this.labelDiv_.parentNode.removeChild(this.labelDiv_);
            this.eventDiv_.parentNode.removeChild(this.eventDiv_);

            // Remove event listeners:
            for (i = 0; i < this.listeners_.length; i++) {
                google.maps.event.removeListener(this.listeners_[i]);
            }
        };

        /**
         * Draws the label on the map.
         * @private
         */
        MarkerLabelView.prototype.draw = function() {
            this.setContent();
            this.setTitle();
            this.setStyles();
        };

        /**
         * Sets the content of the label.
         * The content can be plain text or an HTML DOM node.
         * @private
         */
        MarkerLabelView.prototype.setContent = function() {
            var content = this.marker_.get("labelContent");
            if (typeof content.nodeType === "undefined") {
                this.labelDiv_.innerHTML = content;
                this.eventDiv_.innerHTML = this.labelDiv_.innerHTML;
            } else {
                this.labelDiv_.innerHTML = ""; // Remove current content
                this.labelDiv_.appendChild(content);
                content = content.cloneNode(true);
                this.eventDiv_.appendChild(content);
            }
        };

        /**
         * Sets the content of the tool tip for the label. It is
         * always set to be the same as for the marker itself.
         * @private
         */
        MarkerLabelView.prototype.setTitle = function() {
            this.eventDiv_.title = this.marker_.getTitle() || "";
        };

        /**
         * Sets the style of the label by setting the style sheet and applying
         * other specific styles requested.
         * @private
         */
        MarkerLabelView.prototype.setStyles = function() {
            var i, labelStyle;

            // Apply style values from the style sheet defined in the labelClass parameter:
            this.labelDiv_.className = this.marker_.get("labelClass");
            this.eventDiv_.className = this.labelDiv_.className;

            // Clear existing inline style values:
            this.labelDiv_.style.cssText = "";
            this.eventDiv_.style.cssText = "";
            // Apply style values defined in the labelStyle parameter:
            labelStyle = this.marker_.get("labelStyle");
            for (i in labelStyle) {
                if (labelStyle.hasOwnProperty(i)) {
                    this.labelDiv_.style[i] = labelStyle[i];
                    this.eventDiv_.style[i] = labelStyle[i];
                }
            }
            this.setMandatoryStyles();
        };

        /**
         * Sets the mandatory styles to the DIV representing the label as well as to the
         * associated event DIV. This includes setting the DIV position, z-index, and visibility.
         * @private
         */
        MarkerLabelView.prototype.setMandatoryStyles = function() {
            this.labelDiv_.style.position = "absolute";
            this.labelDiv_.style.overflow = "hidden";
            // Make sure the opacity setting causes the desired effect on MSIE:
            if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
                this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")\"";
                this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")";
            }

            this.eventDiv_.style.position = this.labelDiv_.style.position;
            this.eventDiv_.style.overflow = this.labelDiv_.style.overflow;
            this.eventDiv_.style.opacity = 0.01; // Don't use 0; DIV won't be clickable on MSIE
            this.eventDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=1)\"";
            this.eventDiv_.style.filter = "alpha(opacity=1)"; // For MSIE

            this.setAnchor();
            this.setPosition(); // This also updates z-index, if necessary.
            this.setVisible();
        };

        /**
         * Sets the anchor point of the label.
         * @private
         */
        MarkerLabelView.prototype.setAnchor = function() {
            var anchor = this.marker_.get("labelAnchor");
            this.labelDiv_.style.marginLeft = -anchor.x + "px";
            this.labelDiv_.style.marginTop = -anchor.y + "px";
            this.eventDiv_.style.marginLeft = -anchor.x + "px";
            this.eventDiv_.style.marginTop = -anchor.y + "px";
        };

        /**
         * Sets the position of the label. The z-index is also updated, if necessary.
         * @private
         */
        MarkerLabelView.prototype.setPosition = function(yOffset) {
            var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
            if (typeof yOffset === "undefined") {
                yOffset = 0;
            }
            this.labelDiv_.style.left = Math.round(position.x) + "px";
            this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px";
            this.eventDiv_.style.left = this.labelDiv_.style.left;
            this.eventDiv_.style.top = this.labelDiv_.style.top;

            this.setZIndex();
        };

        /**
         * Sets the z-index of the label. If the marker's z-index property has not been defined, the z-index
         * of the label is set to the vertical coordinate of the label. This is in keeping with the default
         * stacking order for Google Maps: markers to the south are in front of markers to the north.
         * @private
         */
        MarkerLabelView.prototype.setZIndex = function() {
            var zAdjust = (this.marker_.get("labelInBackground") ? -1 : +1);
            if (typeof this.marker_.getZIndex() === "undefined") {
                this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;
                this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
            } else {
                this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;
                this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex;
            }
        };

        /**
         * Sets the visibility of the label. The label is visible only if the marker itself is
         * visible (i.e., its visible property is true) and the labelVisible property is true.
         * @private
         */
        MarkerLabelView.prototype.setVisible = function() {
            if (this.marker_.get("labelVisible")) {
                this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
            } else {
                this.labelDiv_.style.display = "none";
            }
            this.eventDiv_.style.display = this.labelDiv_.style.display;
        };

        return MarkerLabelView;

    })(google.maps.OverlayView);


    return MarkerLabelView;
});