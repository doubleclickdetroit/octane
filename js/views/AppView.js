define([ 'jquery', 'underscore', 'backbone', 'facade', 'globals' ],
function($, _, Backbone, facade, globals) {

    'use strict';


    var AppView = Backbone.View.extend({

        events: {
            'click [data-rel=back]': 'handlePageBack',
            'click [data-internal]': 'delegateBeforeNavigate',
        },

        initialize: function (options) {
            this.render();
            this.setupBackboneLoadingIndicators();
        },

        render: function (display) {
            display = display || false;
            return this.$el.toggleClass('ui-hidden', display);
        },

        setupBackboneLoadingIndicators: function () {
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
                switch(evt) {
                    case 'request'     :
                    case 'loadingbegin':
                        handleLoader.call(this, true);
                        break;

                    case 'reset'     :
                    case 'loadingend':
                        handleLoader.call(this, false);
                        break;
                }
            }

            // the initialize method inherited by subclasses
            Backbone.View.prototype.initialize = function () {
                if (this.model)      this.model.on('all', toggleLoader, this);
                if (this.collection) this.collection.on('all', toggleLoader, this);

                return init.apply(this, arguments);
            };

            // Backbone.View convenience methods
            Backbone.View.prototype.showLoadingIndicator = function (checkView) {
                if (checkView === true) {
                    handleLoader.call(this, true);
                }
                else {
                    $.mobile.showPageLoadingMsg();
                }
            };
            Backbone.View.prototype.hideLoadingIndicator = function (checkView) {
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
        displayAlert: function (message, callback, btnLabel, title) {
            callback = $.isFunction(callback) ? callback : function(){};
            title = title === undefined ? ' ' : title;

            if (navigator.notification) {
                navigator.notification.alert(message, callback, title, btnLabel);
            }
            else {
                callback( alert(title +'\n'+ message) );
            }
        },

        displayConfirm: function (message, callback, btnLabels, title) {
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

        promptToRateIt: function () {
            var self = this;

            facade.publish('app', 'confirm'
                , globals.RATE_IT.MESSAGE      // message
                /* callback */
                , function (button) {

                    // yes = 1, no = 2, later = 3
                    if (button == '1') {    // Rate Now
                        // navigate to the app in iTunes
                    	window.location.href = globals.RATE_IT.URL_IOS;

                        self.model.set('isAppRated', self.model.get('buildVersion'));
                    }
                    else if (button == '2') { // Later
                        self.model.set('isAppRated', globals.RATE_IT.LATER);
                    }
                    else if (button == '3') { // No
                        self.model.set('isAppRated', globals.RATE_IT.NO_THANKS);
                    }

                    self.model.save();
                }
                , globals.RATE_IT.BUTTON_NAMES // buttons
                , globals.RATE_IT.TITLE        // title
            );
        },

        /*
         * Event Handlers
        */
        handlePageBack: function(evt) {
            evt.preventDefault();
            window.history.back();
        },

        delegateBeforeNavigate: function (evt) {
            evt.preventDefault();
            var pathname = $(evt.target).attr('href');
            facade.publish('app', 'beforeNavigate', pathname);
        }

    });

    return AppView;

});