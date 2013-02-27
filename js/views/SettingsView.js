define([ 'jquery', 'facade', 'backbone' ],
function($, facade, Backbone) {

    'use strict';


    var SettingsView;
    SettingsView = Backbone.View.extend({

        el: $('#settings')
    });


    return SettingsView;
});