define([ 'jquery', 'utils', 'facade', 'globals', 'backbone', 'mustache', 'text!tmpl/feedback/page' ],
function ($, utils, facade, globals, Backbone, Mustache, tmpl) {

    'use strict';


    var FeedbackView;
    FeedbackView = Backbone.View.extend({

        el: $('#feedback'),
        
        template: Mustache.compile(tmpl),
        
        events: {
            'change :input': 'handleUpdatingAttribute',
            'click button' : 'handleSavingAttributes'
        },
        
        initialize: function () {
        	
        	// call super
        	this.constructor.__super__.initialize.apply(this, arguments);
        	
        	_.bindAll(this, 'render', 'displaySubmitConfirmation', 'displayFormValidationError');
        	
        	// jQM event listeners
            this.$el.on('pageshow', this.render);
        	
        	// model events

            // Handle when validation fails on the submitted Feedback
            this.listenTo(this.model, 'invalid', this.displayFormValidationError);           
        	
            // create page
            this.pageCreate();
        },

        pageCreate: function () {
        	var $el = this.$el.find(':jqmData(role=content)');
        	$el.html(this.template(globals.feedback.configuration));
        },
        
        render: function () {
        	var data = this.model.toJSON();
        	
        	this.$('#sender').val(data.sender);
        	this.$('#messageBody').val(data.messageBody);
        },
        
        displayConfirmation: function (message, callback) {
        	navigator.notification.confirm(
        		message                                          // message
        		, callback                                       // success callback
        		, globals.feedback.constants.CONFIRMATION_TITLE  // title
        		, globals.feedback.constants.CONFIRMATION_BUTTON // button text
			);
        },
        
        displaySubmitConfirmation: function () {
        	// display success confirmation
        	this.displayConfirmation(
        		/* message */
        		globals.feedback.constants.CONFIRMATION_SUCCESS_TEXT
        		
        		/* callback */
        		, function () {
        			facade.publish('feedback', 'dismissConfirmation');
        		}                     
    		);       	
        },
        
        displayFormValidationError: function (model, error) {
        	// display error confirmation
        	this.displayConfirmation(
        		/* message */
    			error
    			
    			/* callback */
        		, function () {
    				/* 
    				 * just dismiss the dialog so the user is back to the form
    				 * so they can correct their mistakes
    				 */
    			}
    		);
        },
        
        /*
         * Event Handlers
        */
        handleUpdatingAttribute: function (evt) {
            var target = evt.target,
                val = $(target).val();
            facade.publish('feedback', 'updateAttribute', target.id, val);
        },
        
        handleSavingAttributes: function () {
        	facade.publish('feedback', 'saveAttributes');
        }

    });


    return FeedbackView;
});