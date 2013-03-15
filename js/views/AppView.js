define([ 'jquery', 'underscore', 'backbone', 'facade' ],
function($, _, Backbone, facade) {

    'use strict';


    var AppView = Backbone.View.extend({

        events: {
            'click [data-internal]': 'delegateBeforeNavigate'
        },

        initialize: function(options) {
            this.render();
            this.setupBackboneLoadingIndicators();
        },

        render: function(display) {
            display = display || false;
            return this.$el.toggleClass('ui-hidden', display);
        },

        setupBackboneLoadingIndicators: function() {
            // cache initialize method
            var init = Backbone.View.prototype.initialize;

            // handle toggling loading indicator
            function handleLoader(toggle) {
                // is this page visible?
                if (this.$el.is($.mobile.activePage)) {
                    this[(toggle ? 'show' : 'hide')+'LoadingIndicator']();
                }
            }

            // does event warrant loader?
            function toggleLoader(evt) {
                if (evt === 'request') handleLoader.call(this, true);
                if (evt === 'reset')   handleLoader.call(this, false);
            }

            // the initialize method inherited by subclasses
            Backbone.View.prototype.initialize = function() {
                if (this.model)      this.model.on('all', toggleLoader, this);
                if (this.collection) this.collection.on('all', toggleLoader, this);

                return init.apply(this, arguments);
            };

            // Backbone.View convenience methods
            Backbone.View.prototype.showLoadingIndicator = function(checkView) {
                if (checkView === true) {
                    handleLoader.call(this, true);
                }
                else {
                    $.mobile.showPageLoadingMsg();
                }
            };
            Backbone.View.prototype.hideLoadingIndicator = function(checkView) {
                if (checkView === true) {
                    handleLoader.call(this, false);
                }
                else {
                    $.mobile.hidePageLoadingMsg();
                }
            };
        },

        /*
         * Public Methods
        */
        displayAlert: function(message, callback, btnLabel, title) {
            callback = $.isFunction(callback) ? callback : function(){};
            title = title === undefined ? ' ' : title;

            if (navigator.notification) {
                navigator.notification.alert(message, callback, title, btnLabel);
            }
            else {
                callback( alert(title +'\n'+ message) );
            }
        },

        displayConfirm: function(message, callback, btnLabels, title) {
            callback = $.isFunction(callback) ? callback : function(){};
            title = title === undefined ? ' ' : title;

            if (navigator.notification) {
                navigator.notification.confirm(message, callback, title, btnLabels);
            }
            else {
                var response = confirm(title +'\n'+ message) ? 1 : 0;
                callback(response);
            }
        },

        /*
         * Event Handlers
        */
        delegateBeforeNavigate: function(evt) {
            evt.preventDefault();
            var pathname = $(evt.target).attr('href');
            facade.publish('app', 'beforeNavigate', pathname);
        }

    });

    return AppView;

});